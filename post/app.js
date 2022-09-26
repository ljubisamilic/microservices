const express = require("express");
const app = express();
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const port = 3002;

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

app.get("/", (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    res.send(`Post service! User: ${req.session.user}`);
  } else {
    res.send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
