const express = require("express");
const router = express.Router();

const { loginOwner } = require("../controllers/auth");

router.route("/").get(loginOwner);

module.exports = router;
