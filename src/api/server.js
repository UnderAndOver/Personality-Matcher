"use strict";
var express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose");

//models
var Personality = require("./Personality");
var User = require("./User");

//connect server to mongoDB

+mongoose.connect("mongodb://localhost:27017/bigfive", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => res.send("hello world"));

// retrieves all the personalities
app.get("/api/personality/list", (req, res) => {
  Personality.find({}).exec((err, personalities) => {
    if (err) return res.status(404).send("Error while getting personalities!");
    return res.send({
      personalities,
    });
  });
});

// retrieve a personality
app.get("/api/personality/:id", (req, res) => {
  Personality.findById(req.params.id, (err, personality) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      personality,
    });
  });
});

// create a new personality
app.post("/api/personality/create", (req, res) => {
  const personality = new Personality(req.body);
  personality.save((err) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      personality,
    });
  });
});

// update an existing personality with the given object id
app.post("/api/personality/update/:id", (req, res) => {
  let options = {
    new: true,
  };
  Personality.findByIdAndUpdate(
    req.params.id,
    req.body.data,
    options,
    (err, personality) => {
      if (err)
        return res.status(404).send({
          message: err.message,
        });
      return res.send({
        message: "personality updated!",
        personality,
      });
    }
  );
});

// delete an existing personality with the given object id
app.post("/api/personality/delete/:id", (req, res) => {
  Personality.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      message: "personality deleted!",
    });
  });
});

//verify user
async function verify(req) {
  const { OAuth2Client } = require("google-auth-library");
  const CLIENT_ID =
    "588318029265-b4cn4fkv72narnvqdqll2o06791jj546.apps.googleusercontent.com";
  const token = req.params.token;
  const client = new OAuth2Client(CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
app.get("/api/verification/verify/:token", async (req, res) => {
  await verify(req)
    .then(() => {
      return res.send({
        message: "verified",
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).send({
        message: error,
      });
    });
});

// create a new user
app.post("/api/user/create/:id", (req, res) => {
  console.log("creating user");
  console.log(req.params.id);
  const user = new User({ google_id: req.params.id });
  user.save((err) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      user,
    });
  });
});

//retrieve user by google id
app.get("/api/user/:google_id", (req, res) => {
  console.log("finding user");
  User.findOne({ google_id: req.params.google_id }, (err, user) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      user,
    });
  });
});

// update an existing personality with the given object id
app.put("/api/user/update/:id", (req, res) => {
  console.log("updating user");
  console.log(req.params);
  console.log(req.body);
  let options = {
    new: true,
  };
  User.findByIdAndUpdate(req.params.id, req.body, options, (err, user) => {
    if (err)
      return res.status(404).send({
        message: err.message,
      });
    return res.send({
      message: "user updated!",
      user,
    });
  });
});

//retrieve  users
app.get("/api/user/list", (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) return res.status(404).send("Error while getting users!");
    return res.send({
      users,
    });
  });
});

const PORT = 5000;
app.listen(PORT);
console.log("api runnging on port " + PORT + ": ");
