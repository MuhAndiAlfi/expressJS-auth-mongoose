const UserModel = require('../../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// 630f471b501d55bc0834306f
// 630f4516f20d05674d7b568a

module.exports = {
    async register(req, res) {
        const data = new UserModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        try {
            const dataSave = await data.save()
            res
                .status(200)
                .json(dataSave)
        } catch (error) {
            res
                .status(404)
                .json({message: error.message})
        }
    },

    async login(req, res) {
        try {
            const user = await UserModel.findOne({username: req.body.username})

            if (!user) {
                res
                    .status(404)
                    .json({message: 'cannot find username'})
                    return
            }

            // console.log(req.body.password)

            var compare = bcrypt.compareSync(req.body.password, user.password)
            // console.log(compare)

            if (!compare) {
                res
                    .status(404)
                    .json({message: 'wrong password'})
                    return
            }

            var token = jwt.sign({
                id: user.id,
                role: user.role[0].name
            },"SECRET", {expiresIn: 86400})

            req.session.token = token
            req.session.role = user.role[0].name
            // console.log(token)
            res
                .status(200)
                .json({
                    id: user.id, 
                    username: user.username, 
                    email: user.email,
                    role: user.role[0].name
                })
            

        } catch (error) {
            res.status(400).json({message: error.message})
        }
    },
    async logout(req, res) {
        try {
            req.session = null
            return res
                .status(200)
                .json({message: "Logout success"})
        } catch (error) {
            this.next(error)
        }
    }
}