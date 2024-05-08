const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const userRouter = require('./Routes/user');

const app = express();

app.use(bodyparser.json());
app.use(userRouter);

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CREDENTIALS)
.then(() => {
    app.listen(3001, () => console.log("Running on port 3000"));
})
.catch((err) => {
    console.log("db connection failed");
});
