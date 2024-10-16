const express = require("express");
const app = express();
const PORT = 8080;
const routes = require("./routes/index.routes");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!!");
});
app.use("/api", routes);
app.listen(PORT, () => {
  console.log("listening to the port", PORT);
});
