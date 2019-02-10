var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

module.exports = function (app, route) {

    return function (req, res, next) {
        console.log(req.body);
        var data = req.body;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'codeblogue@gmail.com',
                pass: 'memfst87cdblg'
            }
        });
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
                res.json("error");
                next();
            }
            else {
                //console.log('success email');
                res.json("sended");
                next();
            }
        });
    };
};