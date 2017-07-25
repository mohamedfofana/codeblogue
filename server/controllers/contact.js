var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

module.exports = function (app, route) {

    return function (req, res, next) {
        var data = req.body;
        console.log(data);
        // login
        //https://www.google.com/settings/security/lesssecureapps Enabled it but it was not my solution 
        //https://g.co/allowaccess I allowed access from outside for a limited time and this solved my problem.
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'codeblogue@gmail.com',
                pass: 'memfst87cdblg'
            }
        });
        /* var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 xoauth2: xoauth2.createXOAuth2Generator({
                     user: 'codeblogue@gmail.com',
                     clientId: '291884637316-5vn8arj45irvr7jnrmb9rn6n4g1pee11.apps.googleusercontent.com',
                     clientSecret: 'CFze1QYPDj0sP28T9ZnRWMDL',
                     refreshToken: '1/Ls7Uc7m69Lg-ew7rlFtUErr1AnBcvE2sX92NkYM2C5NxsK4q_4OR1Ie--GuS0Ric'
                     //refreshToken: '1/PxRug3XrnNQ8X5YE_oNnmIyEc_29nj5bhcFQJboJj5g'
                 })
             }
         });
         */
        var message = {
            from: 'Codeblogue.com ✔ <codeblogue@gmail.com>', // sender address
            to: 'fofana.mansour@gmail.com', // list of receivers
            subject: data.objet, // Subject line
            text: data.contenu, // plaintext body
            html: '<b>Contact Nom</b>: ' + data.nom + '<br/><b>Contact Email</b>: ' + data.email + '<br/><b>Contact Sujet</b>: ' + data.objet + '<br/><br/>' + data.contenu // html body
        }

        // send mail with defined transport object
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
                res.status(400);
                res.json(data);
                next();
            }
            else {
                res.json(data);
                next();
            }
        });
    };
};