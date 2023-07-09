const AysncHandler = require("express-async-handler");


const index = AysncHandler(async (req, res) => {
    return res.json({ data: [] });
});

module.exports = { index }