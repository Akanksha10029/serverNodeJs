const express=  require('express');
const{handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handleCreateUser} = require('../controllers/user');
const router = express.Router();

//Routes-----

//for browser(SSR-Server side rendering) - http://localhost:3000/users
// router.get("/users", async (req,res) => {
//     const allDBusers =await User.find({});
//     const html = `
//     <html>
//         <head>
//             <title>Users</title>
//         </head>
//         <body>
//             <h1>Users</h1>
//             <ul>
//                 ${allDBusers.map(user => `<li>User first name: ${user.first_name}  email: ${user.email}</li>`).join("\n")}
//             </ul>
//         </body>
//     </html>`
//     res.send(html);
// })

//for android - http://localhost:3000/api/users
router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateUser);

//Dynamic Path parameters- get api/users/:userId or id
router 
    .route("/:id")
    .get(handleGetUserById)
    .patch(handlePatchUserById)
    .delete(handleDeleteUserById);
    
module.exports = router;