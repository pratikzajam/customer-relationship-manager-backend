import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export let createAdmin = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(200).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        const user = await User.findOne({
            where: { email: email }
        });

        if (user?.dataValues.id) {
            return res.status(409).json({
                status: false,
                message: "user allready exists",
                data: null
            })
        }

        if (password != confirmPassword) {
            return res.status(200).json({
                status: false,
                message: "password and confirmPassword does not match",
                data: null
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: "Admin",
            createdBy: null
        });

        // console.log(newUser)


        if (newUser.dataValues.id) {
            return res.status(200).json({
                status: false,
                message: "Admin Created Sucessfully",
                data: null
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }


}


export let createUser = async (req, res) => {

    try {
        const { name, email, password, confirmPassword, role } = req.body;

        const { id } = req.user;


        if (!id) {
            return res.status(404).json({
                status: false,
                message: "Id Not Found",
                data: null
            })
        }




        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(200).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }


        const user = await User.findOne({
            where: { email: email }
        });




        if (user?.dataValues.id) {
            return res.status(409).json({
                status: false,
                message: "user allready exists",
                data: null
            })
        }

        if (password != confirmPassword) {
            return res.status(200).json({
                status: false,
                message: "password and confirmPassword does not match",
                data: null
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            createdBy: id
        });

        console.log(newUser)


        if (newUser.dataValues.id) {
            return res.status(201).json({
                status: true,
                message: "User Created Sucessfully",
                data: null
            })
        }


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }


}





export let Login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required",
                data: null
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: null
            });
        }

        console.log(user)

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
                data: null
            });
        }


        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                adminId: user.createdBy
            },
            process.env.jwt_secret,
            { expiresIn: '24h' }
        );


        return res.status(200).json({
            status: true,
            message: "Login successful",
            data: {
                token
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        });
    }
};



