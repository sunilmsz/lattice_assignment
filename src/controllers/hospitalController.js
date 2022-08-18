const mySql = require("../database/mySqlConnection")
const { isValidSt } = require("../validator/validator")

const createHospital = async (req, res) => {

    try {
        if (Object.keys(req.body).length == 0)
        return res.status(400).send("Invalid Request! No data provided")

    const { name } = req.body

    if (!isValidSt(name)) {
        return res.status(400).send("Hospital name is a required filed and should be a string")
    }

    if(!(/[a-z]/.test(name.trim())))
    return res.status(400).send({message:"name should contain alphabets"})

    const query = `INSERT INTO hospitals(name) values ("${name.trim()}")`

    const result = await mySql.promise().query(query)

    return res.status(201).send({ msg: "new hospital added successfully"})

    } catch (error) {

        return res.status(500).send({msg:"Internal Sever Error"})
    }
   
}



const getHospital = async (req, res) => {
    try {

        if (Object.keys(req.body).length == 0)
            return res.status(400).send("Invalid Request! No data provided")

        let { hospital_id } = req.body

        if (hospital_id == undefined || typeof hospital_id != "number") {
            if (typeof hospital_id == "string" && !isNaN(Number(hospital_id)))
                hospital_id = Number(hospital_id.trim())
            else
                return res.status(400).send({ msg: "Hospital_id is a required filed and should be a number" })
        }

        const hospitalQuery = `SELECT  name FROM hospitals where id="${hospital_id}"`

        const [hospitalData] = await mySql.promise().query(hospitalQuery);

        const hospital_name = hospitalData[0]?.name;

        if (hospitalData.length == 0)
            return res.status(404).send({ msg: "hospital_id does not exist!, you have entered wrong hospital_id" })

        const psychiatristQuery = `SELECT id,name,(select count(*) from patients where patients.psychiatrist_id = psychiatrists.id) as patientCount from psychiatrists where hospital_id="${hospital_id}"`
        const [psychiatristData] = await mySql.promise().query(psychiatristQuery)

        const psychiatristCount = psychiatristData.length
        const totalPatient = psychiatristData.reduce((prev,curr)=>prev+curr.patientCount,0)

        return res.send({msg:"Success", "Hospital Name": hospital_name,"Total Psychiatrist Count":psychiatristCount,"Total Patient Count" : totalPatient,"Psychiatrist Details":psychiatristData})

    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "Internal Server Error" })
    }
}

module.exports = { createHospital,getHospital }