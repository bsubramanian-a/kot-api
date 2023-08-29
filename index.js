const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./handler/auth');
const community = require('./handler/community')
const dotenv = require('dotenv');
const admin = require('./handler/admin')
const appl = require("./handler/app")
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const authMiddleware = async (req, res, next) => {
    const response = await auth.init(req, res);
    //console.log("auth route",response.body);
    res.json(JSON.parse(response.body));
    next(response);
};

const communityMiddleware = async (req, res, next) => {
  const response = await community.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const adminMiddleware = async (req, res, next) => {
  const response = await admin.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};

const appMiddleware = async (req, res, next) => {
  const response = await appl.init(req, res);
  //console.log("community route",response.body);
  res.json(JSON.parse(response.body));
  next(response);
};



app.use('/dev/auth', authMiddleware);
app.use('/dev/community', communityMiddleware);
app.use('/dev/admin', adminMiddleware);
app.use('/dev/app', appMiddleware);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});