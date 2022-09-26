const express = require("express");
const app = express();
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const port = 3001;

// redis@v4
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    name: "user_service",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  //   req.session.user = "Sinisa";
  //   console.log(req.session.id);
  res.send(`User service!`);
});

app.get("/login", (req, res) => {
  req.session.user = "Ljubisa";
  res.redirect("/post");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/user");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
