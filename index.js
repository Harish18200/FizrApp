const express = require('express');
const app = express();
const port = 3000;
const router = require('./Router/router')
require('dotenv').config({ path: './config/.env' });

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
