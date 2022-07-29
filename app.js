const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const router = express.Router();
const dataHandler = require("./dataHandler");

require("dotenv").config();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.get("/getJiraTickets", (req, res) => {
  dataHandler.getJiraInfo().then((values) => {
    console.log(values);
    res.json({ jirasObject: values });
  });
});

app.use("/", router);
app.use(express.static("public"));
app.listen(port, () => {
  console.log(`Engineer Training app listening on port ${port}`);
});
