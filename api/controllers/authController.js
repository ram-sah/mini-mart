import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

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
      password,
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
