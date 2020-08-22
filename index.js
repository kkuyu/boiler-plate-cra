const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key');
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((error, userInfo) => {
        if (error) {
            return res.json({
                success: false,
                error
            });
        } else {
            return res.status(200).json({
                success: true
            });
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})