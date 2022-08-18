const mySql = require("../database/mySqlConnection")
const { isValidSt } = require("../validator/validator")
const createPsychiatrist = async (req, res) => {

    try {

        if (Object.keys(req.body).length == 0)
            return res.status(400).send("Invalid Request! No data provided")

        let { name, email, phone, password, hospital_id, } = req.body

         // -------- Incomming request has required field with valid dataType or not-----------

        if (!isValidSt(name)) {
            return res.status(400).send({ msg: "Psychiatrist name is a required filed and should be a string" })
        }

        if (!(/[a-z]/.test(name.trim())))
            return res.status(400).send({ message: "name should contain alphabets" })

        if (hospital_id == undefined || typeof hospital_id != "number") {
            if (typeof hospital_id == "string" && !isNaN(Number(hospital_id))) // if data coming from form-data it needs conversion to int
                hospital_id = Number(hospital_id.trim())
            else
                return res.status(400).send({ msg: "Hospital_id is a required filed and should be a number" })
        }

        // ---- email, password, phone structure validation -----

        if (!isValidSt(email))
            return res.status(400).send({ msg: "email is mandatory,it should be string and non-empty" })

        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(email.trim()))
            return res.status(400).send({ msg: "please enter valid email address" })


        if (!isValidSt(phone))
            return res.status(400).send({ msg: "phone number is mandatory, it should be string and non-empty" })

        regex = /^[+]?[0-9]{1,2}\d{10,}$/

        if (!regex.test(phone.trim()))
            return res.status(400).send({ msg: "Enter mobile number in 91XXXXXXXXXX  or +91XXXXXXXXXX, here 91 is country code and XXXXXXXXXX is your mobile number" })

        if (!isValidSt(password))
            return res.status(400).send({ msg: "password is mandatory, it should be string and non-empty" })

        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/

        if (!regex.test(password.trim()))
            return res.status(400).send({ msg: "Enterd password is invalid!. It should contain One upperCase letter, one lowercase letter and a number.Minimum length is 8 and Maximum length is 15" })

        //---------- uniqueness of email & mobile --------

        const emailQuery = `SELECT COUNT(*) as count FROM psychiatrists where email="${email.trim()}"`
        const [emailData] = await mySql.promise().query(emailQuery)
        if (emailData[0].count != 0)
            return res.status(400).send({ msg: "provided email is already registered" })

        const mobileQuery = `SELECT COUNT(*) as count FROM psychiatrists where phone="${phone.trim()}"`;
        const [mobileData] = await mySql.promise().query(mobileQuery)
        if (mobileData[0].count != 0)
            return res.status(400).send({ msg: "provided phone is already registered" })

        // ----------checking hospital_id exist or not in database-----------

        const hospitalQuery = `select count(*) as count from hospitals where id="${hospital_id}"`
        const [hospitalData] = await mySql.promise().query(hospitalQuery)
        if (hospitalData[0].count == 0)
            return res.status(404).send({ message: "provided hospital_id doesn't exist" })


        // ----- inserting new record into database            

        const query = `INSERT INTO psychiatrists(name,phone,email,password,hospital_id) values ("${name.trim()}", "${phone.trim()}","${email.trim()}","${password.trim()}",${hospital_id} )`

        await mySql.promise().query(query)

        res.status(201).send({ msg: "new psychiatrist added successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "internal serever error" })
    }
}




module.exports = { createPsychiatrist }