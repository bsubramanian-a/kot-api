const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./handler/auth');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const authMiddleware = async (req, res, next) => {
    const response = await auth.init(req, res);
    console.log("auth route",response.body);
    res.json(JSON.parse(response.body));
    next(response);
};

app.use('/dev/auth', authMiddleware);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});