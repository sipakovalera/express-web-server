const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const app = express();
const port = 3000;
const usersRoutes = require("./users/routes/users.route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/users', usersRoutes);
app.get('/', (req, res) => {res.send('Hello from homepage')});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
