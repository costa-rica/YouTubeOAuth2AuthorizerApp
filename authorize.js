const { google } = require("googleapis");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

dotenv.config();

const SCOPES = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.force-ssl",
];

const TOKEN_PATH = path.join(process.cwd(), "authJsonFiles", "token.json");
const CLIENT_SECRET_PATH = path.join(
  process.cwd(),
  "authJsonFiles",
  "client_secret.json"
);

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(CLIENT_SECRET_PATH, "utf8"));
  const { client_id, client_secret, redirect_uris } =
    credentials.installed || credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("Authorize this app by visiting this url:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.mkdirSync(path.dirname(TOKEN_PATH), { recursive: true });
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
      console.log("Token stored to", TOKEN_PATH);
    });
  });
}

authorize();
