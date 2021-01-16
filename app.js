const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require("./users/routes/users.route");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
