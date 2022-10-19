const router = require("express").Router();
const { findAll, uploadFile, findOne } = require("../controllers/students.controller");

router.route("/list").get(findAll);

router.route("/upload").post(uploadFile);

router.route("/:id/result").get(findOne);

module.exports = router;
