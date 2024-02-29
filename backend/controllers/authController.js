import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

//User Register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        //validations
        if (
            !email ||
            !password ||
            !name ||
            !phone ||
            !address ||
            email === "" ||
            password === ""
        ) {
            return res.send({ error: "Enter valid data in all fields" });
        }
        //check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Register login now",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "Register Successful",
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

//Post Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Check password"
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            massage: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Login error",
            error
        })
    }
};

//test
export const testController = (req, res) => {
res.send('protected route');
}
