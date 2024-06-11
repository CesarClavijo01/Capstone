const express = require('express');
require('dotenv').config();
const cors = require('cors')

//routes
const apiRouter = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));