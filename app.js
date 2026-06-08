require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const Card = require("./models/Card");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const card = await Card.create({
      title: "Design Login Page",
      description: "Create login UI",
    });

    console.log(card);

    process.exit();
  })
  .catch(err => console.error(err));