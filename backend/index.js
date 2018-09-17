const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Default data
let data = {
  "0000000001": {
    id: "0000000001",
    title: "First List",
    todos: ["First todo of first list!", "Second todo"],
    completed: [0, 1]
  },
  "0000000002": {
    id: "0000000002",
    title: "Second List",
    todos: ["First todo of second list!"],
    completed: [0]
  }
};

app.use(express.json());

app.get("/api/getData", (req, res) => {
  res.send(data);
});

app.post("/api/setData", urlencodedParser, (req, res) => {
  data[req.body.listId].todos = req.body.todos;
  console.log(req.body.todos);
});

// app.post("/api/updateCompleted", urlencodedParser, (req, res) => {
//   data[req.body.listId].completed = req.body.completed;
//   console.log("Completed", data);
// });

const port = 5000;
app.listen(port, () => console.log("Example app listening on port", port));
