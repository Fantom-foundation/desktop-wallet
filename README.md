<div align="center">
<br>
<img src='app/images/icons/fantomLogo.png' />

</div>

<br>

<p align="center">
A Cross-Platform Desktop Apps based on  <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-transform-hmr">React Transform HMR</a> for fund transfer.
</p>

<hr>
<br>


## Install

First, clone the repo via git:

```bash
git clone  https://github.com/fantom-foundation-private/wallet.git your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

Start the app in the `dev` environment. 

```bash
$ yarn run dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## Usage

<h2>Have no account opened ? Do following : </h2>
<hr/>
<h3> Create new account : </h3>
<li> Enter valid account name.</li>
<li> Passwords must be at least 8 characters long.</li>
<li> To create a account user must enter all the fields and select icon for account, Password hint is optional. </li>
<br/>

<h3> Account information : </h3>
<li> This step is meant for,  backup of account credentials. </li>
<li> User can print the account credentials or may copy them to file on system for future references.</li>
<li> Then confirm that,  backup of account credentials is done.</li>
<br/>

<h3>Confirm  :</h3>
<li> Last step is to confirm account setup, to unlock the account, write down the keys  in input box and press Unlock. </li>
<li>On unlock Account Management screen is displayed.</li>
<br/><br/>

<h2>Already have one account opened : </h2>
<hr/>
<li>Account management screen is displayed, where one can transer funds to other. </li>
<li>Balance in wallet is displayed here.</li>
<li>History of already done transactions is displayed </li>
<li>User can have multiple accounts , which are displayed here. </li>
<li>Funds can be transfered from any selected account. </li>





