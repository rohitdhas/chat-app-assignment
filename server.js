// _________________________ IMPORTS _________________________
require("dotenv").config();
const mainRoutes = require('./routes/mainRoutes');
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
// _________________________ DB CONNECTION _________________________

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose Connected!✅");
  })
  .catch((err) => console.log(err));

// _________________________ MIDDLEWERES _________________________

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// _________________________ ROUTES _________________________

app.use(mainRoutes);

// __________________________________________________

const server = app.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    // Socket Connection
    require("./controller/socket_controller");
    console.log(`Server is running on port ${PORT}!🚀`);
  }
});

module.exports = { server };
