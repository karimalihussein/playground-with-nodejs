const friends = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Doe",
  },
  {
    id: 3,
    name: "John Smith",
  },
  {
    id: 4,
    name: "Jane Smith",
  },
  {
    id: 5,
    name: "Florin Pop",
  },
  {
    id: 6,
    name: "Vladimir Putin",
  },
];


function getFriends(req, res) {
  res.json(friends);
}

function getFriend(req, res) {
    const id = parseInt(req.params.id);
    const friend = friends.find((friend) => friend.id === id);
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
        id: friends.length + 1,
        name: req.body.name,
    };
    friends.push(newFriend);
    res.json(newFriend);
}


module.exports = {getFriends, getFriend, postFriend}



