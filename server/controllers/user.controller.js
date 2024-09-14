import User from '../models/user.js'
// import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, profile } = req.body
        // let { profile } = req.body


        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // if (profile) {
        //     const response = await cloudinary.uploader.upload(profile, { folder: "Users" })
        //     profile = response?.secure_url
        // }

        const newUser = new User({ name, email, password, phone, profile })

        await newUser.save()

        res.status(201).json({ message: 'User created successfully', user: newUser })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ message: 'Users fetched successfully', users })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const userDeleted = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User has been deleted", userDeleted })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json({ message: "User has been fetched", user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email, password, phone } = req.body

        const user = await User.findByIdAndUpdate(id, { name, email, password, phone }, { new: true })
        res.status(200).json({ message: "User has been updated", user })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export { createUser, getAllUsers, deleteUser, getSingleUser, updateUser }