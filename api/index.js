const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//const Token = require('./model/token')
//const sendEmail = require('./sendEmail')
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect('mongodb://0.0.0.0:27017/userDB')
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log("Error Connecting to mongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Admin = require("./models/admin");
const Order = require("./models/order");
const Request = require("./models/request");



const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "sujananand0@gmail.com",
      pass: "kewlafvbvedsapie",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// User registration route
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "User with given email already exists" });
    }

    const newUser = await user.save();
    /*const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex")
    }).save();*/
    //const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    //await sendEmail(user.email, "Verify Email", url);
    res.status(201).json({ message: "Welcome to our e-commerce app" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Email verification route
/*app.get("/users/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();
    res.status(200).send({ message: "Email verified" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});*/
//user login endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    /*if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }*/

    // Return the user's name instead of generating a token
    res.status(200).json({ userName: user.name });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});

//admin login endpoint 
app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
});
//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userName, address } = req.body;

    // Find the user by the userName
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new address to the user's addresses array
    user.addresses.push(address);

    // Save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});


//endpoint to get all the addresses of a particular user
app.get("/addresses/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;

    // Find the user by the name field
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the addresses" });
  }
});


//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userName, cartItems, totalPrice, paymentMethod } = req.body;

    // Find the user by userName
    const user = await User.findOne({ name: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create an array of product objects from the cartItems
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    // Create a new Order
    const order = new Order({
      user: user._id, // Use the user's ID
      products: products,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("Error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});


//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});
//get all users
app.get("/users/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the users" });
  }
});


//delete user
app.delete('/delete/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//get all requests
app.get("/requests/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the users" });
  }
});


//delete request
app.delete('/deleterequest/:userId', async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.userId);
    res.json(deletedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// send request route
app.post('/sendrequest', async (req, res) => {
  try {


    const request = new Request({
      name: req.body.name,
      email: req.body.email,
      pname: req.body.pname,
    });

    let existingRequest = await Request.findOne({ email: req.body.email });
    if (existingRequest) {
      return res.status(409).send({ message: "Request already exists" });
    }

    const newRequest = await request.save();

    res.status(201).json({ message: "Your request will be treated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" })
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
})