import '../../../global';
import EthUtil from 'ethereumjs-util';
import axios from 'axios';
import config from '../../../store/config/index';

const configHelper = config();

const Tx = require('ethereumjs-tx');

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);

function transferMoneyViaEthereum(from, to, value, memo, privateKey) {
  return new Promise((resolve, reject) => {
    console.log('Promise : ')
    web3.eth.getTransactionCount(from).then((count) => {
        console.log('from : ', from);
      const privateKeyBuffer = EthUtil.toBuffer(privateKey);
      console.log('privateKeyBuffer : ', privateKeyBuffer)
      web3.eth.getGasPrice((err, result) => {
        const rawTx = {
          from: from,
          to: to,
          value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
          gasLimit: Web3.utils.toHex(22000),
          gasPrice: Web3.utils.toHex(result),
          nonce: Web3.utils.toHex(count),
          data: memo,
        };
        console.log('rawTx : ', rawTx)

        const tx = new Tx(rawTx);
        tx.sign(privateKeyBuffer);
        const serializedTx = tx.serialize();
        console.log('serializedTx : ', serializedTx)

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
          .on('transactionHash', function (hash) {
            console.log('transactionHash', hash);
          })
          .on('receipt', function (receipt) {
            console.log('receipt', receipt);
          })
          .on('confirmation', (confirmationNumber, receipt) => {
            console.log('confirmation confirmationNumber', confirmationNumber);
            console.log('confirmation', receipt);
            if (confirmationNumber === 1 ) {
              let hash = '';
              if (receipt && receipt.transactionHash) {
                hash = receipt.transactionHash;
              }
              resolve({ success: true, hash });
            }
          })
          .on('error', (err) => {
            console.log('error', err);
            let message = '';
            if (err.message) {
              message = err.message
            }
            reject({ success: false, message });
          });
      });
    }).catch((err) => {
      console.log(err, 'err');
      reject({ success: false, message });
    });
  })
}

function transferMoneyViaFantom(from, to, value, memo, privateKey) {
  console.log('transfer via fantom test net');
  console.log('from : ', from);
  console.log('to : ', to);
  console.log('privateKey : ', privateKey);
  return new Promise((resolve, reject) => {
    getNonceFantom(from).then((count) => {
      const privateKeyBuffer = EthUtil.toBuffer(privateKey);
      const rawTx = {
        from: from,
        to: to,
        value: Web3.utils.toHex(Web3.utils.toWei(value, "ether")),
        gasPrice: '0x09184e72a000',
        gasLimit: '0x27100',
        nonce: Web3.utils.toHex(count),
        data: memo,
      };
      const tx = new Tx(rawTx);
      tx.sign(privateKeyBuffer);
      const serializedTx = tx.serialize();

        const hexTx = '0x' + serializedTx.toString('hex')
      axios.post(configHelper.apiUrl + '/sendRawTransaction', hexTx)
        .then(function (response) {
          console.log(response.data)
          if (response && response.data && response.data.txHash) {
            resolve({ success: true, hash: response.data.txHash });
          } else {
            reject({ message: 'Invalid response received' });
          }
          
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });



    }).catch((err) => {
      console.log(err, 'err');
      reject({ success: false, message });
    });
  })
}

function getNonceFantom(address) {
  return new Promise((resolve, reject) => {
    axios.get(configHelper.apiUrl +'/account/' + address)
      .then(function (response) {
        console.log('nonce', response.data.nonce)
        resolve(response.data.nonce);
        // tx.nonce = response.data.nonce
        // generateRawTx(tx, priv)
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

export function transferMoney(from, to, value, memo, privateKey) {
  console.log('config configHelper',configHelper );
  if (configHelper.isEthereumMode) {
    return transferMoneyViaEthereum(from, to, value, memo, privateKey);
  }

  // from = '0xD5C29D82aFE0e591c8d0e781D9c2430c1F45e646';
  // privateKey = '0x49bd475cbb4f0acec9221a33172da8f5ff00590a889beb6d238a2c9313b03752';

  // from = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
  // privateKey = '0x50c4bf4dde1f383a172f52cb4624f089f685e67e00c6741a3ae03826c99cf082';
  return transferMoneyViaFantom(from, to, value, memo, privateKey);
};
