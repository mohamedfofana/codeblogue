var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
/*generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});
*/
// login
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'manoufof@gmail.com',
            clientId: ' 875318172417-fse9e2u3vll76nmlju0vgad3gupkj1ad.apps.googleusercontent.com ',
            clientSecret: ' aRwUmXnodJT3Ucae4dpXwVyS ',
            refreshToken: '1/hnAY57sczbjyV448LcfqpbhlW-nFHFERRNbzU3nTVs8',
            accessToken: 'ya29.Ci9WA1-EVKbkgBasd4rfU2ykuhCPHBj6s8W-370beqKQwVKKCFdAH6pYQSEax5T-MQ'
        })
    }
});


// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo <manoufof@hotmail.com>', // sender address
  	to: "codeblogue@gmail.com", // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
