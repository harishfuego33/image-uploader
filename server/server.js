const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;
// GET POST
app.get("/", async (req, res) => {
  res.json({
    status: "success",
    message: "server is running successfully",
  });
});
// CREATE POST
app.post("/api/posts", async (req, res) => {
  console.log(req.body);
  res.json({
    status: "success",
    message: "I got the data",
  });
});

app.delete("api/post/:id", async (req, res) => {
  res.send({});
});

app.listen(PORT, () => {
  console.log(`app is running successfully on localhost:${PORT}`);
});
