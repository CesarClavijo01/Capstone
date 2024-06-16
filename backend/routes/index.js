const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const brandsRoutes = require('./brands');
const wrestlersRoutes = require('./wrestlers');
const championshipRoutes = require('./championships');
const rosterRoutes = require('./rosters');
const userRoutes = require('./users');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/users')

// apiRouter.use(async (req, res, next) => {
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');

//     if(!auth){
//         next()
//     }else if(auth.startsWith(prefix)){
//         const token = auth.slice(prefix.length);

//         try{
//             const { id } = jwt.verify(token, JWT_SECRET)

//             if(id){
//                 req.user = await getUserById(id);
//                 next()
//             }

//             next({
//                 name: 'AuthorizationHeaderError',
//                 message: 'Token malformed',
//               });
//         }
//         catch({ name, message }){
//             next({ name, message})
//         }
//     }

//     next({
//         name: 'AuthorizationHeaderError',
//         message: `Authorization token must start with ${prefix}`,
//       });
// })

apiRouter.use('/brands', brandsRoutes);
apiRouter.use('/wrestlers', wrestlersRoutes);
apiRouter.use('/championships', championshipRoutes);
apiRouter.use('/rosters', rosterRoutes);
apiRouter.use('/users', userRoutes);

module.exports = apiRouter