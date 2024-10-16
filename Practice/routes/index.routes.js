const express = require("express");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.status(200).send("This is hello world");
});
router.post("/hello", (req, res) => {
  console.log(req.body);
  res.status(200).send("This is hello world");
});
router.put("/hello", (req, res) => {
  console.log(req.body);
  res.status(200).send("This is hello world");
});
router.delete("/hello/:id", (req, res) => {
  res.status(200).send("This is hello world");
});

module.exports = router;
