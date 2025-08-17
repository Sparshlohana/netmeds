const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../services/user.service")

const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(' ')[1];

        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }
        const user = await userService.getUserProfileByToken(jwt)

        return res.status(200).send(user)


    } catch (error) {
        console.log("error from controller - ", error)
        return res.status(500).send({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateUserProfile = async (req, res) => {
    const { firstName, lastName, email, password, mobile } = req.body
    try {
        const jwt = req.headers.authorization?.split(' ')[1];
        const userId = getUserIdFromToken(jwt)

        if (!jwt) {
            return res.status(404).send({ error: "token not found" })
        }
        const user = await userService.updateUser(userId, { firstName, lastName, email, password, mobile })
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
};


module.exports = { getUserProfile, getAllUsers, updateUserProfile }