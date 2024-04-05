const { response } = require('express');
var usermodel = require('../model/usermodel');

//local storage
const { LocalStorage } = require('node-localstorage')
localStorage = new LocalStorage('./scratch')

//persist data
const storage = require('node-persist');
storage.init();

//Send Mail To Gmail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lakkadumang306@gmail.com',
        pass: 'jybgcpxzxcrlqhwk'
    }
});
exports.insert = async (req, res) => {

    // localStorage.setItem("otp", otp);
    await storage.setItem('otp',otp)


    var mailOptions = {
        from: 'lakkadumang306@gmail.com',
        // to: 'tirthrajtrivedi2003@gmail.com',
        to: 'rahulrathodrrb216@gmail.com',
        subject: 'Sending Email using Node.js',
        text: ' Add to cart And Redux Demo Leto Avje  '
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    var data = await usermodel.create(req.body);

    try {
        res.status(200).json({
            status: data
        })
    }
    catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }

}

exports.get_data = async (req, res) => {

    var data = await usermodel.find();
    // var old_otp = await localStorage.getItem("otp")
    var old_otp = await storage.getItem('otp') 
    console.log(old_otp)
    try {
        res.status(200).json({
            status: data,
            old_otp
        })
    }
    catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }

}

exports.update_data = async (req, res) => {

    var id = req.params.id;
    var data = await usermodel.findByIdAndUpdate(id, req.body);

    try {
        res.status(200).json({
            status: "Data Updated !!!"
        })
    }
    catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }
}

exports.delete_data = async (req, res) => {

    var id = req.params.id;
    var data = await usermodel.findByIdAndDelete(id);

    try {

        res.status(200).json({
            status: "Data Deleted !!!"
        })
    }
    catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }

}

exports.get_single = async (req, res) => {

    var id = req.params.id;
    var data = await usermodel.findById(id);

    try {
        res.status(200).json({
            status: data
        })

    }
    catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }

}

exports.get_bymail = async (req, res) => {

    var data = await usermodel.find({ "email": req.body.email });

    console.log(data[0].name)

    try {
        res.status(200).json({
            status: data
        })
    } catch {
        res.status(500).json({
            status: "Error !!!"
        })
    }
}