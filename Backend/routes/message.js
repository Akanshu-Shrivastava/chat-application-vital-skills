const {addMessages,getMessages} = require("..controllers/MessageController")

const router = require("express").Router();

router.post("/addmsg",addMessage);
router.post("/getmsg",getMessage);

module.exports = router;