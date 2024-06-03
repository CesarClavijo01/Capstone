const express = require('express');
require('dotenv').config();

//routes
const brandsRoutes = require('./routes/brands')

const app = express();

app.use('/brands', brandsRoutes)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));