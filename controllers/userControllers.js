const User = require("../models/userModel");
const {Op}  = require("sequelize")


const createUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        // const user =  User.build({
        //     name,age
        // })
        // await user.save()
//the fields optional object will only use the mentions field data
        const user = await User.create({ name, age },{fields:["name","age"]})
        console.log(user.toJSON())
        res.status(201).json({
            status: "success",
            data:user
        })

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
        
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByPk(id);
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
            where: {
                id: {
                    [Op.gt]:1
                }
                
            }
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
module.exports  = {createUser,getUserById,updateUser,getAllUsers,updateUsingReqBodyData}