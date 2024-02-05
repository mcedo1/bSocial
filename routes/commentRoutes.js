const express = require("express");
const {createComment,getAllComments} = require("../controllers/commentController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/:userId", validateToken, createComment);
router.get("/:postId", validateToken, getAllComments);

module.exports = router;
