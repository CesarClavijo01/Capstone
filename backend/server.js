const express = require('express');
require('dotenv').config();

//routes
const apiRouter = require('./routes')

const app = express();

app.use('/api', apiRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));