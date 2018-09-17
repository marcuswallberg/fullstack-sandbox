const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Default data
let data = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: ["First todo of first list!", "Second todo"]
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: ["First todo of second list!"]
  }
};

app.use(express.json());

app.get("/api/getData", (req, res) => {
  res.send(data);
});

let count = 0;

app.post("/api/setData", urlencodedParser, (req, res) => {
  data[req.body.listId].todos = req.body.todos;
  console.log(data);
});

const port = 5000;
app.listen(port, () => console.log("Example app listening on port", port));
