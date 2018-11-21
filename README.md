# Fantom Desktop Wallet

This is Fantom's desktop wallet application, built in ElectronJS.


## Installation

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
