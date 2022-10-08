require("express-async-errors");
require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const authRouter = require("./routes/auth");
const landlordRouter = require("./routes/landlords");
const caretakerRouter = require("./routes/caretakers");
const tenantRouter = require("./routes/tenants");

app.use(express.json());

app.use("/api/v1/authorize", authRouter);
app.use("/api/v1/landlords", landlordRouter);
app.use("/api/v1/caretakers", caretakerRouter);
app.use("/api/v1/tenants", tenantRouter);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
