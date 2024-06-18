const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

//routes
const apiRouter = require('./routes')
const dbUsers = require('./db/users') 

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
      // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {

        const { userId } = jwt.verify(token, JWT_SECRET);

        console.log('id is', userId)
  
        if (userId) {
          req.user = await dbUsers.getUserById(userId);
          next();
        } else {
          next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token malformed',
          });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });
  
  app.use((req, res, next) => {
    if (req.user) {
      console.log('User is set:');
      console.log(req.user)
    }
    
    next();
  });

app.use('/api', apiRouter);

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message, table: error.table});
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));