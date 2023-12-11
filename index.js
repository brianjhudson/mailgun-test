/* NOTE: This is a simple implementation of Mailgun's Send Email Docs 
 * Code excerpts from the docs are embedded here in a simple Express server
 * Confirm the docs at https://documentation.mailgun.com/en/latest/quickstart-sending.html#send-via-api
*/
const express = require('express');
const dotenv = require('dotenv');
const formData = require('form-data');
const Mailgun = require('mailgun.js')

dotenv.config({path: '.env'});

const app = express();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'})

app.post('/confirm', (req, res, next) => {
    console.log("Sending message...");
    mg.messages.create('***.mailgun.org', {
        from: "Excited User <mailgun@***.mailgun.org>",
        to: ["brianjasonhudson@gmail.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
    })
    .then(msg => console.log("Success log", msg)) // logs response data
    .catch(err => console.log("Error log", err)) // logs any error
    .finally(() => res.status(200).json({message: "Finished"}))

})

app.listen(4200, () => {
    console.log('Listening on 4200')
})