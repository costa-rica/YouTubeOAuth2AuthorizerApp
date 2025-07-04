# YouTubeOAuth2AuthorizerApp

## Using the app

### 1. Set up YouTube account / upload API OAuth 2.0 (one time)

- must get client_id and client_secret from Google Cloud Console
  - go to https://console.cloud.google.com/
  - select the kyber vision account (not your personal account)
- get credentials for desktop app
- add test user to YouTube account
- you will get a file that looks like: client_secret_12345abce.apps.googleusercontent.com.json
- move this file to the authJsonFiles directory and rename it to client_secret.json

### 2. Authorize (one time)

- use authorize.js
- terminal command `node authorize.js`
- browser page will open. Select the user that
- once you click "continue", you will be redirected to a page that says "Authorization successful!"
  - copy the code from the page
  - paste the code into the terminal

#### Exmaple the browser address bar will have something like:

http://localhost/?code=4/0-copy-all-this-code-from-after-the-=-until-the-&-WEQ&scope=https://www.googleapis.com/auth/youtube.force-ssl%20https://www.googleapis.com/auth/youtube.upload%20https://www.googleapis.com/auth/youtube.readonly

- I copied `4/0-copy-all-this-code-from-after-the-=-until-the-&-WEQ` and pasted it into the terminal
- this will create a token.json file in the authJsonFiles directory

### 3. Upload

- use index.js
- terminal command `node index.js --filename <filename>`

## Install

```bash
yarn install
yarn add googleapis dotenv @google-cloud/local-auth
```
