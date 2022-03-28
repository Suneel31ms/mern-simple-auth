const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


//Register user
exports.postRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
};

//Login user
exports.postLogin =  async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" })
      }
      const isMatched = await bcrypt.compare(password, user.password)
      if (!isMatched) {
        return res.status(400).json({ error: "Invalid Credentials" })
      }
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      })
      res.json({ token , user:user.name})
    } catch (err) { 
      console.log(err)
    }
  }

  //Dasboard
  exports.dashboard =  async (req, res) => {
  // console.log(req.user)
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (err) {
    console.log(err)
  }
}