const express = require('express');
require('dotenv').config();

//routes
const brandsRoutes = require('./routes/brands');
const wrestlersRoutes = require('./routes/wrestlers');
const championshipRoutes = require('./routes/championships');

const app = express();

app.use('/brands', brandsRoutes);
app.use('/wrestlers', wrestlersRoutes);
app.use('/championships', championshipRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));