require("dotenv").config();

const mongoose = require("mongoose");
const Card = require("./models/Card");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected");

  // CREATE
  const card = await Card.create({
    title: "Learn MongoDB",
    description: "Practice CRUD",
  });

  console.log("Created:", card);

  // READ
  const cards = await Card.find();
  console.log("All Cards:", cards);

  // UPDATE
  const updated = await Card.findByIdAndUpdate(
    card._id,
    {
      status: "Done",
    },
    {
      new: true,
    }
  );

  console.log("Updated:", updated);

  // DELETE
  await Card.findByIdAndDelete(card._id);

  console.log("Deleted");
}
run();