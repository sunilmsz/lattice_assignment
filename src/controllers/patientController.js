const mySql = require("../database/mySqlConnection")
const { isValidSt } = require("../validator/validator")
const s3 = require("./awsController")
const createPaitent = async (req, res) => {

    try {

        if (Object.keys(req.body).length == 0)
            return res.status(400).send("Invalid Request! No data provided")

        let { name, email, address, phone, password, psychiatrist_id } = req.body

        const files = req.files

        // -------- Incomming request has required field with valid dataType or not-----------

        if (!isValidSt(name)) {
            return res.status(400).send({ msg: "Paitient name is a required filed and should be a string" })
        }

        if (!(/[a-z]/.test(name.trim())))
            return res.status(400).send({ message: "name should contain alphabets" })

        if (!isValidSt(address)) {
            return res.status(400).send({ msg: "address is a required filed and should be a string" })
        }

        if (psychiatrist_id == undefined || typeof psychiatrist_id != "number") {
            if (typeof psychiatrist_id == "string" && !isNaN(Number(psychiatrist_id))) // if data coming from form-data it needs conversion to int
                psychiatrist_id = Number(psychiatrist_id.trim())
            else
                return res.status(400).send({ msg: "psychiatrist_id is a required filed and should be a number" })
        }

        // ---- email ,mobile number, password  structure valdiation---------

        if (!isValidSt(email))
            return res.status(400).send({ msg: "email is mandatory,it should be string and non-empty" })

        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(email.trim()))
            return res.status(400).send({ msg: "please enter valid email address" })

        if (phone) {
            if (!isValidSt(phone))
                return res.status(400).send({ msg: "phone  should be string and non-empty" })

            regex = /^[+]?[0-9]{1,2}\d{10,}$/

            if (!regex.test(phone.trim()))
                return res.status(400).send({ msg: "Enter mobile number in 91XXXXXXXXXX  or +91XXXXXXXXXX, here 91 is country code and XXXXXXXXXX is your mobile number" })
                phone = phone.trim()
        }
        else
            phone = null


        if (!isValidSt(password))
            return res.status(400).send({ msg: "password is mandatory, it should be string and non-empty" })

        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/

        if (!regex.test(password.trim()))
            return res.status(400).send({ msg: "Enterd password is invalid!. It should contain One upperCase letter, one lowercase letter and a number.Minimum length is 8 and Maximum length is 15" })

        // --------psychiatrist_id present in our database or not ----------------

        const psychiatristQuery = `select count(*) as count from psychiatrists where id = "${psychiatrist_id}"`
        const [psychiatristData] = await mySql.promise().query(psychiatristQuery)

        if (psychiatristData[0].count == 0)
            return res.status(404).send({ message: "psychiatrist_id does not exist, enter a valid one" })

        // -------------checking uniqueness of email and mobile -------------------

        const emailQuery = `SELECT COUNT(*) as count FROM patients where email="${email.trim()}"`
        let [row] = await mySql.promise().query(emailQuery)
        if (row[0].count != 0)
            return res.status(400).send({ msg: "provided email is already registered" })

            if(phone){
                const mobileQuery = `SELECT COUNT(*) as count FROM patients where phone="${phone}"`;
                [row] = await mySql.promise().query(mobileQuery)
                if (row[0].count != 0)
                    return res.status(400).send({ msg: "provided phone is already registered" })
            }
       

            // photo validations

        if (files.length == 0) {
            return res.status(400).send({ message: "Please provide patient photo by the field name photo" })
        }
        if (files.length > 1 || files[0].fieldname != "photo")
            return res.status(400).send({ msg: "only one photo is allowed by the field name photo" })

        if (!["image/png", "image/jpeg"].includes(files[0].mimetype))
            return res.status(400).send({ status: false, message: "only png,jpg,jpeg files are allowed for photo" })

        const link = await s3.uploadFile(files[0], "patientPhoto")   // uploading photo into s3

        //------------------inserting new record into database ----------------------

        query = `INSERT INTO patients(name,address,phone,email,password,photo,psychiatrist_id) values ("${name.trim()}", "${address.trim()}","${phone}","${email.trim()}","${password.trim()}","${link}",${psychiatrist_id} )`

        await mySql.promise().query(query)

        res.status(201).send({ msg: "new patient added successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "internal serever errro" })
    }
}


module.exports = { createPaitent }