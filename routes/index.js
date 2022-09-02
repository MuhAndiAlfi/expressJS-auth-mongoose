const express = require('express')
const router = express.Router()
const controller = require('../app/controller/api')
const user = controller.user
const auth = controller.auth

const checkExist = require('../app/middleware/checkUserExist')
const verifyToken = require('../app/middleware/authJwt')


router.get('/user', verifyToken, user.getAll)
router.post('/user', checkExist, user.create)
router.put('/user/:id', user.update)
router.delete('/user/:id', user.delete)

router.post('/role', user.createRole)
router.get('/role', user.showRole)
router.post('/setRole/:id', user.setUserRole)

router.post('/register', checkExist, user.create)
router.post('/login', auth.login)
router.post('/logout', auth.logout)
module.exports = router