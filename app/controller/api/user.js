const express = require('express')
const user = express.Router()
const UserModel = require('../../model/user')
const RoleModel = require('../../model/role')
const URoleModel = require('../../model/userRole')

const bcrypt = require('bcryptjs')
module.exports = {
    async getAll(req, res) {
        // getone
        if (req.query.id) {
            try {
                const data = await UserModel.findById(req.query.id)
                res
                    .status(200)
                    .json(data)
            } catch (error) {
                res
                    .status(404)
                    .json({message: `Can't find id${req.query.id}`})
            }

        } else {
            try {
                const data = await UserModel.find()
                res.json(data)
            } catch (error) {
                res
                    .status(500)
                    .json({message: error.message})
            }
        }

    },
    async create(req, res) {

        if (!req.body) {
            return res
                .status(400)
                .json({message: "field cannot empty"})
        }

        const data = new UserModel({
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
            email: req.body.email
        })

        try {
            const saveData = await data.save()
            res
                .status(200)
                .json(saveData)
        } catch (error) {
            res
                .status(400)
                .json({message: error.message})
        }
    },
    async update(req, res) {
        if (!req.body) {
            return res
                .status(400)
                .json({message: "field cannot be empty"})
        }

        const id = req.params.id

        try {
            const udpateData = await UserModel.findByIdAndUpdate(id, req.body)
            res
                .status(200)
                .json(udpateData)
        } catch (error) {
            res
                .status(404)
                .json({
                    message: 'this data cannot update, maybe id user with' + id + 'not found'
                })
        }

    },
    async delete(req, res) {
        const id = req.params.id
        try {
            const deleteData = await UserModel.findByIdAndDelete(id)
            res
                .status(200)
                .json(deleteData)
        } catch (error) {
            res
                .status(404)
                .json({message: `cant find id ${id} to delete`})
        }

    },
    async createRole(req, res) {
        const data = new RoleModel({name: req.body.name})

        console.log(req.body.name)
        await RoleModel
            .findOne({name: req.body.name})
            .then((exist) => {
                if (exist) {
                    res
                        .status(404)
                        .json({message: `name role already used`})
                    return
                }
            })

        try {
            const saveData = await data.save()
            res
                .status(200)
                .json(saveData)

        } catch (err) {
            res
                .status(404)
                .json({message: err.message})
        }

    },
    async showRole(_, res) {
        try {
            const data = await RoleModel.find()
            res
                .status(200)
                .json(data)

        } catch (err) {
            res
                .status(404)
                .json({message: err.message})

        }

    },
    async setUserRole(req, res) {

        const id = req.params.id
        const roleId = req.body.roleId

        const data = new URoleModel({userId: id, roleId: roleId})

        try {
            const existRole = await URoleModel.findOne({userId: id})
            if (existRole) {
                res
                    .status(404)
                    .json({message: "this user already have role"})
                return
            }

            const existUser = await UserModel.findById(id)
            if (!existUser) {
                res
                    .status(400)
                    .json({message: "cannot find user"})
                return
            }

            const role = await RoleModel.findOne({roleId: roleId})

            const setRole = await UserModel.findByIdAndUpdate(id, {
                $push: {
                    role: {
                        name: role.name
                    }
                }
            })

            const saveData = await data.save()

            res
                .status(200)
                .json(saveData)
        } catch (err) {
            res
                .status(400)
                .json({message: err.message})
        }
    }
}
