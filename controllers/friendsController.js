const model = require("../models/friend");

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
    const id = parseInt(req.params.id);
    const friend = model.find((friend) => friend.id === id);
    if (!friend) {
        return res.status(404).send("Friend not found");
    }
    res.json(friend);
}

function postFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).send("Name is required");
    }

    const newFriend = {
        id: model.length + 1,
        name: req.body.name,
    };
    model.push(newFriend);
    res.json(newFriend);
}


module.exports = {getFriends, getFriend, postFriend}



