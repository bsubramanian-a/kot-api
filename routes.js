const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
const routes = [];

app.use((req, res, next) => {
  const { path, httpMethod } = req;

  routes.push({
    path,
    httpMethod,
  });

  next();
});

console.log(routes);