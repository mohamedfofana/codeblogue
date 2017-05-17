var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

module.exports = function(app, route){

return function(req, res, next){
    var data = req.body;
    
    // login
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: 'codeblogue@gmail.com',
                clientId: '291884637316-5vn8arj45irvr7jnrmb9rn6n4g1pee11.apps.googleusercontent.com',
                clientSecret: 'CFze1QYPDj0sP28T9ZnRWMDL',
                refreshToken: '1/yvw9Zvz9giT3A6mwbXYyDQw3hRwncdj3SvOqhPvz0TY'
            })
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
    transporter.sendMail(message, function(error, info){
        if(error){
            console.log(error);
            res.status(400);
            res.json(data);            
            next();
        }   
        else{
            res.json(data);            
            next();
        }     
    });
};
};