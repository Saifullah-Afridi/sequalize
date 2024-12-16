const User = require("../models/userModel");
const {Op}  = require("sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
const createUser = async (req, res) => {
    try {
        const { name, age, password, passwordConfirm, email } = req.body;
        if (password !== passwordConfirm) {
            return res.status(406).json({
                status: "fail",
                message: "Passwords do not match"
            })
        }
         let [user,created]  =await User.findOrCreate({
               where: {
                email
            },
            defaults: {
                name,age,password,passwordConfirm
            }
         })
        if (!created) {
            res.status(400).json({
                status: "fail",
                message: "User already exists"
            })
        }

        user = user.toJSON()
        delete user.password
        delete user.passwordConfirm

        if (created) {
            res.status(200).json({
                status: "success",
                message: "User created successfully",
                user
            })
        }
        
        // const user =  User.build({
        //     name,age
        // })
        // await user.save()
//the fields optional object will only use the mentions field data
        // const user = await User.create({ name, age },{fields:["name","age"]})
        // console.log(user.toJSON())
        // res.status(201).json({
        //     status: "success",
        //     data:user
        // })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
        
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) { 
            return res.status(400).json({
                status: "success",
                message: "Please provide email and password"
            })
        }
        const isUser = await User.findOne({
        }, {
            where: {
                email:email
            }
        })
       if (!isUser) {
             res.status(404).json({
            status: "fail",
            message: "Invalid email or password"
             })  
            
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password, isUser.password)
        if (!isPasswordCorrect) {
             res.status(404).json({
            status: "fail",
            message: "Invalid email or password"
             })  
            
        }
        const token = await jwt.sign({ id: isUser.id, email: isUser.email },"asdfladsfldskfjldasllfj")
        res.cookie("token", token, {
            
        })
        res.status(200).json({
            status: "success",
            message: "You have been loged in ",
            token
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: "fail",
            message:error
        })
    }
}




const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByPk(id, {
            include:Post
        });
        if (!user) {
            return res.status(200).json({
                status: "success",
                message:"This user does not exist"
            })
        }
        res.status(200).json({
            status: "success",
            data:user
        })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            status: "fail",
            message:error
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} =req.params
        const user = await User.findByPk(id);
        if (!user) { 
            return res.status(404).json({
                status: "fail",
                message:"The user does not found "
            })
        }
    user.update(req.body)
     const  updatedUser = await user.save()
        res.status(200).json({
            status: "success",
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            // attributes:["name"]
            //renaming the attribute
            //the name will be shown as the username in response
            attributes: ["id",["name", "userName"]],
                // where: {
                //     id: {
                //         [Op.gt]:1
                //     }
                    
                // },
            order: [
                ["id","ASC"]
            ],
            limit: 4,
            offset:2

        });
        res.status(200).json({
            status: "success",
            totalUser:users.length,
            data: users
        })
    }
    catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
        })
    }

}

const updateUsingReqBodyData = async (req, res) => {
    try {
        const { name } = req.body;
        const [affectedCount] = await User.update({
            name: name
        }, {
            where: {
                name: "joe",
                 
            },
            // returning: true
        })
        if(affectedCount === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with the name saif',
            });
        }
        res.status(200).json({
            status: "success",
            totalChangeEntries:affectedCount
        })
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message:error.message
        })
    }
}

const countgreaterthenfive = async (req, res) => {
    try {
        const counts = await User.count({
            where: {
                id: {
                    
                    [Op.gt]:1
                }
            }
        })
        res.status(200).json({counts})
    } catch (error) {
        
    }
}
module.exports  = {createUser,getUserById,updateUser,getAllUsers,updateUsingReqBodyData,countgreaterthenfive,login}