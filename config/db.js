const mongoose = require("mongoose")

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB is connected"))
  .catch(err => console.log(err))