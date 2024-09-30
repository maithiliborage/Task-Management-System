import userModel from "../models/user.js";
import auth from "../common/auth.js";

const create = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (!existingUser) {
      const hashedPassword = await auth.hashPassword(req.body.password);
      await userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).send({
        message: "User created successfully",
      });
    } else {
      res.status(400).send({
        message: `User with email ${req.body.email} already exists`,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      let hashCompare = await auth.hashCompare(
        req.body.password,
        user.password
      );

      if (hashCompare) {
        let token = await auth.createToken({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        });

        let userData = await userModel.findOne(
          { email: req.body.email },
          { password: 0, createdAt: 0, email: 0 }
        );
        res.status(200).send({
          message: "login Successful",
          token,
          userData: {
            ...userData.toObject(),
            id: user._id 
          },
        });
      } else {
        res.status(400).send({
          message: `Invalid Password`,
        });
      }
    } else {
      res.status(400).send({
        message: `Account with ${req.body.email} does not exist!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Internal Server Error`,
      error: error.message,
    });
  }
};

const  registerUser = async (req, res) => {
  const { name, email, mobile, add, status, role, desc, password } = req.body;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !status ||
      !add ||
      !role ||
      !mobile ||
      !desc
    ) {
      return res
        .status(400)
        .json({ message: "Please fill in all the required fields." });
    }

    const hashedPassword = await auth.hashPassword(password);
    const prenumber = await userModel.findOne({ mobile: mobile });
    const preUser = await userModel.findOne({ email: email });

    if (preUser) {
      return res
        .status(400)
        .send({ message: ` ${req.body.email}  is already present.` });
    }
    if (prenumber) {
      return res
        .status(400)
        .send({ message: ` ${req.body.mobile} is already present.` });
    }
    const newUser = new userModel({
      name,
      status,
      add,
      role,
      email,
      mobile,
      desc,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Created Successfully", newUser });
    // console.log(newUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await userModel.find();
    const totalUsers = await userModel.countDocuments({ role: "user" });
    const activeUsers = await userModel.countDocuments({ status: "Active" });
    const inactiveUsers = await userModel.countDocuments({
      status: "InActive",
    });

    res.status(200).json({ userData, totalUsers, activeUsers, inactiveUsers });

    console.log(userData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getUserEmail = async (req, res) => {
  try {
    const employeeEmails = await userModel.find({ role: "employee" }, 'email');

    const emails = employeeEmails.map(employee => employee.email);

    res.status(200).json(emails);

    console.log(emails);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userIndividual = await userModel.findById(id);

    if (!userIndividual) {
      return res.status(404).json("User not found");
    }

    console.log(userIndividual);
    res.status(200).json(userIndividual);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    // const hashedPassword = await Auth.hashPassword(password);

    req.body.password = await auth.hashPassword(req.body.password);
    const updateduser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("User not found");
    }

    console.log(deletedUser);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json("Internal Server Error");
  }
};

export default {
  create,
  login,
  registerUser,
  getUserData,
  getUserEmail,
  getIndividualUser,
  deleteUser,
  updateUserData,
};
