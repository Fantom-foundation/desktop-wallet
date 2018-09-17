import { remote } from 'electron';
import WalletEther from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import Store from "../store/userInfoStore";

const Buffer = require('safe-buffer').Buffer;

const fs = require('fs');

/**
 * 
 * @param {String} path 
 * To get files array at a path.
 */
const getFilesAtPath = (path) => new Promise((resolve, reject) => {
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
      })
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
  const getFileAtPathAndContains = (path, address) => new Promise((resolve, reject) => {
    if (path && path !== '') {
      const fileArray = [];
      fs.readdir(`${path}`, (err, result) => {
        if (err) {
          reject(new Error('Unknown error occured.'));
        } else {
          result.forEach(file => {
            const fileName = file.toLowerCase();
            const keyName = (address.toLowerCase()).replace('0x', '');
            if (fileName.substr(-5) === '.json' && fileName.includes(keyName)) {
              fileArray.push(file);
            }
          });
          resolve({ success: true, result: fileArray });
        }
      })
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
  }

  /**
   * 
   * @param {String} address 
   * To get the keystor of particular address
   */
  const getSavedKeystoreWithAddress = (address) => {
    const appPath = remote.app.getPath('userData');
    return getFileAtPathAndContains(appPath, address);
  }


  /**
   * 
   * @param {String} address 
   * To get data of file having keystore contain address.
   */
  const getKeystoreDataOfAddress = (address) => new Promise((resolve, reject) => {
    console.log('address in keystore : ', address)
      getSavedKeystoreWithAddress(address).then((result) => {
        if (result.success && result.result && result.result.length
          && result.result.length > 0) {
            const file = result.result[0];
            console.log('filename of file to read : ', file);
            const appPath = remote.app.getPath('userData');
            fs.readFile(`${appPath}/${file}`, (err, data) => {
              if (err) {
                  reject(new Error('Not able to read file.'))
              } else {
                resolve({ success: true, result: data });
              }
          });
          } else {
            reject(new Error('Not able to get keystore'))
          }
          return true;
      }).catch(error => reject(error));
    })

  /**
   * 
   * @param {String} address 
   * @param {String} password 
   * To get private key from keystore. We just need to pass
   * public address and password.
   */
  const getPrivateKeyOfAddress = (address, password) => new Promise((resolve, reject) => {
      getKeystoreDataOfAddress(address).then((result) => {
        if (result.success && result.result) {
          console.log('getKeystoreDataOfAddress result from address file : ', result.result.toString('utf8') )
          console.log(1);
          const data = result.result.toString('utf8');
          console.log(1);
          const wallet = WalletEther.fromV3(data, password);
          console.log(1);
          const privateKeyBuffer = EthUtil.bufferToHex(wallet.getPrivateKey());
          console.log(1);
          resolve({ success: true, result: privateKeyBuffer });
        } else {
          reject(new Error('Unable to read data.'))
        }
        return true;
      }).catch(err => reject(err));
    })

/**
 * 
 * @param {String} privateKey 
 * @param {String} password 
 * To save the private key in keystore and lock with password.
 */
  const savePrivateKey = (privateKey, password) => new Promise((resolve, reject) => {
    console.log('private key file creating....2 : ', privateKey, password);
      /** */
      const privateKeyBuffer = EthUtil.toBuffer(privateKey);
      // const privateKeyBuffer = Buffer.from(privateKey, 'hex')
      /** */
      const wallet = WalletEther.fromPrivateKey(privateKeyBuffer);
      console.log('wallet  :', wallet);
      const keystoreFilename = wallet.getV3Filename();
      console.log('keystoreFilename  :', keystoreFilename);
      const keystore = wallet.toV3(password);
      console.log('keystore  :', keystore);
      const appPath = remote.app.getPath('userData');
      console.log('appPath  :', appPath);
      const savePath = `${appPath}/${keystoreFilename}.json`;
      console.log('savePath  :', savePath);
      fs.writeFile(`${appPath}/${keystoreFilename}.json`, JSON.stringify(keystore), (err) => {
          if (err) {
            reject(new Error('Unable to store file.'));
          } else {
            console.log('no error, savepath of file : ', savePath);
            resolve({ success: true, result: savePath })
          }
          
          console.log("The file was succesfully saved!");
      });
    })

  /**
   * To get list of valid accounts.
   */
  const getValidAccounts = () => new Promise((resolve, reject) => {
      const userAccountStore = Store.store;
      console.log('loaded accounts userAccountStore: ', Store.size);
      if (Store.size && Store.size > 0) {
        console.log('getSavedKeystoreFiles called')
        getSavedKeystoreFiles().then((data) => {
          const validAccounts = [];
          if (data && data.success && data.result && data.result.length && data.result.length > 0) {
            console.log('data : ', data);
            const keys = Object.keys(userAccountStore);
            console.log('keys : ', keys);
            const fileArr = data.result;
            console.log('fileArr : ', fileArr);
            for (const key of keys) {
              for(const file of fileArr) {
                const fileName = file.toLowerCase();
                console.log('fileName : ', fileName);
                const keyName = (key.toLowerCase()).replace('0x', '');
                console.log('keyName : ', keyName);
                if (fileName.includes('utc') && fileName.includes(keyName)) {
                  console.log('validAccounts key : ', key);
                  validAccounts.push(key);
                  break;
                }
              }
            }
            console.log('success validAccounts validAccounts : ', validAccounts);
            resolve({success: true, result: validAccounts})
          } else {
            console.log('1 success No accounts already setup : ');
            resolve({success: true, message:'No accounts already setup.', result: []})
          }
          return true;
        }).catch(err => reject(err));
      } else {
        console.log('2 success No accounts already setup : ');
        resolve({success: true, message:'No accounts already setup.', result: []})
      }
    })



  export default {
    getFilesAtPath,
    getFileAtPathAndContains,
    getSavedKeystoreFiles,
    getSavedKeystoreWithAddress,
    getKeystoreDataOfAddress,
    getPrivateKeyOfAddress,
    savePrivateKey,
    getValidAccounts,
  };
  