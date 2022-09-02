const UserModel = require('../model/user')

checkExist = (req, res, next) => {
    UserModel
        .findOne({username: req.body.username})
        .then((user) => {
            if (user) {
                res
                    .status(400)
                    .json({message: 'Username already use '})
                return
            }

            UserModel
                .findOne({email: req.body.email})
                .then((pass) => {

                    if (pass) {
                        res
                            .status(400)
                            .json({message: 'email already use '})
                        return
                    }
                    next()
                })
                .catch((err) => res.status(400).json(err.message))
                

        })
        .catch((err) => res.status(400).json(err.message))

    }

module.exports = checkExist