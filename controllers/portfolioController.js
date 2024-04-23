const nodemailer = require('nodemailer')
const sendGridTransport = require('nodemailer-sendgrid-transport')

//transport
const transporter = nodemailer.createTransport(
    sendGridTransport({
        auth: {
            api_key: process.env.API_SENDGRID 
        },
    })
)


const sendEmailController = (req,res) => {
    try {
        const {name,email,msg} = req.body

        //validation
        if(!name || !email ||!msg){
            return res.status(500).send({
                success:false,
                message:'Enter all fields correctly',
            });
        }

        //email matter
        transporter.sendMail({
            to:'akshitjain5616@gmail.com',
            from:'akshitjain5616@gmail.com',
            subject:'Regarding Mern Portfolio App',
            html: `
                <h5>Information Details</h5>
                <ul>
                    <li><p>Name : ${name}</p></li>
                    <li><p>E-Mail : ${email}</p></li>
                    <li><p>Message : ${msg}</p></li>
                </ul>
            `
        })

        return res.status(200).send({
            success:true,
            message:'Message Send Successfully',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Send Email API Error',
            error
        });
    }
}

module.exports = {sendEmailController};