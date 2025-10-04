const {BadRequestError} = require("../errors")
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


const SMS = (phoneNumber,name,email)=>{
    if (!phoneNumber) {
      throw new BadRequestError('Please provide a phone number')//
    }
    client.messages
  .create({ 
    body: `${name} votre inscription est enregistrer avec l'email: ${email}`,
    from: process.env.TWILIO_PHONE-NUMBER,
    to: phoneNumber 
  })
  .then(message => console.log(message.sid));
}

module.exports = SMS