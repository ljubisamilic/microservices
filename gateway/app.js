const express = require("express");
const app = express();
const proxy = require("express-http-proxy");
const port = 3000;

app.use("/user", proxy("http://localhost:3001"));
app.use("/post", proxy("http://localhost:3002"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
