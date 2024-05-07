const express = require("express");

const PORT = 3333;
const app = express();
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(201).json({ message: "hello world" });
});
