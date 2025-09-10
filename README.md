# appstore-connect-jwt-generator-cli

[![npm version](https://badge.fury.io/js/appstore-connect-jwt-generator-cli.svg)](https://badge.fury.io/js/appstore-connect-jwt-generator-cli)

## Useage

### Run using npx without global installation

```sh
npx -y appstore-connect-jwt-generator-cli@latest \
        --cert "${APP_STORE_CONNECT_PRIVATE_KEY}" \
        --keyId "${APP_STORE_CONNECT_API_KEY_ID}" \
        --issuerId "${APP_STORE_CONNECT_ISSURE_ID}"
```

### Install globally and run

```sh
npm i -g appstore-connect-jwt-generator-cli
```

or

```sh
yarn global add appstore-connect-jwt-generator-cli
```

or

```sh
pnpm add -g appstore-connect-jwt-generator-cli
```

```sh
jwt-gen --cert "${APP_STORE_CONNECT_PRIVATE_KEY}" \
        --keyId "${APP_STORE_CONNECT_API_KEY_ID}" \
        --issuerId "${APP_STORE_CONNECT_ISSURE_ID}"
```
