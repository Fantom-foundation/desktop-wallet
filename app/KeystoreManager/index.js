import '../global';
import { remote } from 'electron';
import WalletEther from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import Store from '../store/userInfoStore';

const fs = require('fs');
const keythereum = require('keythereum');
const Web3 = require('web3');

const web3 = new Web3();

/**
 *
 * @param {String} path
 * To get files array at a path.
 */
const getFilesAtPath = path =>
  new Promise((resolve, reject) => {
    if (path && path !== '') {
      const fileArray = [];
      fs.readdir(`${path}`, (err, result) => {
        if (err) {
          reject(new Error('Unknown error occured.'));
        } else {
          result.forEach(file => {
            if (file.substr(-5) === '.json') {
              fileArray.push(file);
            }
          });
          resolve({ success: true, result: fileArray });
        }
      });
    } else {
      reject(new Error('Invalid path name.'));
    }
  });
/**
 *
 * @param {String} path
 * @param {String} address
 * To get file at a path and file name should contain a particular address as well.
 */
const getFileAtPathAndContains = (path, address) =>
  new Promise((resolve, reject) => {
    if (path && path !== '') {
      const fileArray = [];
      fs.readdir(`${path}`, (err, result) => {
        if (err) {
          reject(new Error('Unknown error occured.'));
        } else {
          result.forEach(file => {
            const fileName = file.toLowerCase();
            const keyName = address.toLowerCase().replace('0x', '');
            if (fileName.substr(-5) === '.json' && fileName.includes(keyName)) {
              fileArray.push(file);
            }
          });
          resolve({ success: true, result: fileArray });
        }
      });
    } else {
      reject(new Error('Invalid path name.'));
    }
  });

/**
 * Get list of saved keystore files.
 */
const getSavedKeystoreFiles = () => {
  const appPath = remote.app.getPath('userData');
  return getFilesAtPath(appPath);
};

/**
 *
 * @param {String} address
 * To get the keystor of particular address
 */
const getSavedKeystoreWithAddress = address => {
  const appPath = remote.app.getPath('userData');
  return getFileAtPathAndContains(appPath, address);
};

/**
 *
 * @param {String} address
 * To get data of file having keystore contain address.
 */
const getKeystoreDataOfAddress = address =>
  new Promise((resolve, reject) => {
    getSavedKeystoreWithAddress(address)
      .then(result => {
        if (
          result.success &&
          result.result &&
          result.result.length &&
          result.result.length > 0
        ) {
          const file = result.result[0];
          const appPath = remote.app.getPath('userData');
          fs.readFile(`${appPath}/${file}`, (err, data) => {
            if (err) {
              reject(new Error('Not able to read file.'));
            } else {
              resolve({ success: true, result: data });
            }
          });
        } else {
          reject(new Error('Not able to get keystore'));
        }
        return true;
      })
      .catch(error => reject(error));
  });

/**
 *
 * @param {String} address
 * @param {String} password
 * To get private key from keystore. We just need to pass
 * public address and password.
 */
const getPrivateKeyOfAddress = (address, password) =>
  new Promise((resolve, reject) => {
    getKeystoreDataOfAddress(address)
      .then(result => {
        if (result.success && result.result) {
          const data = result.result.toString('utf8');

          const jsonData = JSON.parse(data);

          keythereum.recover(password, jsonData, dataRes => {
            console.log('keytherem data: ', dataRes);
            if (dataRes instanceof Buffer) {
              const hexVal = EthUtil.bufferToHex(dataRes);
              console.log('keytherem hexVal data: ', hexVal);
              resolve({ success: true, result: hexVal });
            } else if (dataRes instanceof Error) {
              reject(dataRes);
            } else {
              reject(new Error('Invalid Password.'));
            }
          });
        } else {
          reject(new Error('Unable to read data.'));
        }
        return true;
      })
      .catch(err => {
        console.log(err, 'err');
        reject(err);
      });
  });

/**
 *
 * @param {String} privateKey
 * @param {String} password
 * To save the private key in keystore and lock with password.
 */
const savePrivateKey = (privateKey, password) =>
  new Promise((resolve, reject) => {
    /** */
    const privateKeyBuffer = EthUtil.toBuffer(privateKey);
    // const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    /** */
    const wallet = WalletEther.fromPrivateKey(privateKeyBuffer);
    const keystoreFilename = wallet.getV3Filename();
    console.log('keystoreFilename : ', keystoreFilename);

    const keystore = web3.eth.accounts.encrypt(privateKey, password);

    const appPath = remote.app.getPath('userData');
    const savePath = `${appPath}/${keystoreFilename}.json`;
    fs.writeFile(
      `${appPath}/${keystoreFilename}.json`,
      JSON.stringify(keystore),
      err => {
        if (err) {
          reject(new Error('Unable to store file.'));
        } else {
          resolve({ success: true, result: savePath });
        }

        console.log('The file was succesfully saved!');
      }
    );
  });

/**
 * To get list of valid accounts.
 */
const getValidAccounts = () =>
  new Promise((resolve, reject) => {
    const userAccountStore = Store.store;
    if (Store.size && Store.size > 0) {
      getSavedKeystoreFiles()
        .then(data => {
          const validAccounts = [];
          if (
            data &&
            data.success &&
            data.result &&
            data.result.length &&
            data.result.length > 0
          ) {
            const keys = Object.keys(userAccountStore);
            const fileArr = data.result;
            for (const key of keys) {
              for (const file of fileArr) {
                const fileName = file.toLowerCase();
                const keyName = key.toLowerCase().replace('0x', '');
                if (fileName.includes('utc') && fileName.includes(keyName)) {
                  validAccounts.push(key);
                  break;
                }
              }
            }
            resolve({ success: true, result: validAccounts });
          } else {
            resolve({
              success: true,
              message: 'No accounts already setup.',
              result: []
            });
          }
          return true;
        })
        .catch(err => reject(err));
    } else {
      resolve({
        success: true,
        message: 'No accounts already setup.',
        result: []
      });
    }
  });

export default {
  getFilesAtPath,
  getFileAtPathAndContains,
  getSavedKeystoreFiles,
  getSavedKeystoreWithAddress,
  getKeystoreDataOfAddress,
  getPrivateKeyOfAddress,
  savePrivateKey,
  getValidAccounts
};
