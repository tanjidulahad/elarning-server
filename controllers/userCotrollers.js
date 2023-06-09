const User = require("../model/User")
const bcryptjs = require("bcryptjs")

const userSignupController = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body
    
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({ message: "please provide the required field" })
    }

    let existinguser

    try {
        existinguser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }

    if (existinguser) {
        return res.status(400).json({ message: "user already exist. please signin" })
    }

    const hashedpassword = bcryptjs.hashSync(password, 8)

    const user = new User({
        firstname,
        lastname,
        email,
        password:hashedpassword
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(201).json({ message: "user created successfully." })
}


// sign in controller

const userSigninController = async (req, res, next) => {
    const { email, password } = req.body

    let existinguser

    try {

        existinguser = await User.findOne({ email },{_id:0})

    } catch (error) {
        console.log(error)
    }

    if (!existinguser) {
        return res.status(400).json({ message: "user doesn't exist. please sign up" })
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, existinguser.password)

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "invalid email or password" })
    }

    const {firstname,lastname,email:emailid}=existinguser


    return res.status(200).json({ message: "user successfully logged in",data:{firstname,lastname,email:emailid} })

}




exports.userSignupController = userSignupController
exports.userSigninController = userSigninController