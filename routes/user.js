const {getAllUsers,getUser,updateUser,updateUserPassword,deleteUser,createUser} = require("../controllers/user")
const express = require("express")
const router = express.Router()
const {adminAuth,auth} = require("../middleware/authentication")

router.route('/').post(createUser).get(getAllUsers)

router.route('/:id').get(auth,getUser).delete(adminAuth,deleteUser).patch(auth,updateUser)
router.route('/:id/updateUserPassword').patch(auth,updateUserPassword);

module.exports = router
