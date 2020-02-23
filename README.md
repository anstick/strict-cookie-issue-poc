# strict-cookie-issue-poc

## Install
Add 2 aliases to `/etc/hosts`
```
echo '127.0.0.1  integration.strictcookies.poc.local' | sudo tee -a /etc/hosts
echo '127.0.0.1  oauthserver.strictcookies.poc.local' | sudo tee -a /etc/hosts
```

Locally-trusted development certificates setup (https://github.com/FiloSottile/mkcert)
```
mkcert install
mkcert integration.strictcookies.poc.local oauthserver.strictcookies.poc.local
```

Run node server
```
yarn install
yarn start
```

## Tests
### No redidect
Open https://oauthserver.strictcookies.poc.local:3000/

Expected result: `document.cookie` contains `csrf_token` cookie.
Actual result: the same.

### Server redirect
Open https://integration.strictcookies.poc.local:3000/redirect

Expected result: Redirected to https://oauthserver.strictcookies.poc.local:3000/ and document.cookie contains `csrf_token` cookie.
Actual result: `document.cookie` is empty.

### Client redirect
Open https://integration.strictcookies.poc.local:3000/redirect_js

Expected result: Redirected to https://oauthserver.strictcookies.poc.local:3000/ and document.cookie contains `csrf_token` cookie.
Actual result: `document.cookie` is empty.

