const twilio = require('twilio');
require("dotenv").config({ path: "../config/.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Je t\'aime',
    to: '+33751652614',
    from: '+13862843120'
  })
  .then((message) => console.log(message.sid))
  .catch((err) => console.log(err));