const express = require('express');
require('dotenv').config();
const cors = require('cors')

//routes
const apiRouter = require('./routes')

const app = express();

app.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
      // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
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
    }
  
    next();
  });

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));