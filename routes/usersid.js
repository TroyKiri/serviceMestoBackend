const usersIdRouter = require("express").Router();
const fs = require("fs");
const path = require("path");
const usersArray = path.join(__dirname, "../data/users.json");

const users = (callback) => {
  fs.readFile(usersArray, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    return callback(JSON.parse(data));
  });
}

usersIdRouter.get("/users/:_id", (req, res) => {
  users((data) => {
    const userId = data.filter((item)=>{
      return req.params._id === item._id;
    })
    if (userId.length === 0) {
      return res.status(404).send({ "message": "Нет пользователя с таким id" });
    } else {
      return res.send(userId[0]);
    }
  });
});

module.exports = usersIdRouter;