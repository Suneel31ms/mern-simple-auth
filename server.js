const express = require("express");
const path = require("path")
const cors = require("cors")

require("dotenv").config()

const app = express();

require("./config/db")

app.use(cors())
app.use(express.json());

app.use('/auth', require('./routes/user'))

// Serve build
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }

  const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running PORT--${PORT}`));
