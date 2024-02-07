const express = require('express');
const app = express();
const port = 3001;

app.use("/users", require("./routes/usersRoute"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});