import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const router = express.Router();

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email })

        if (userExist) {
            const checkPassword = await bcrypt.compare(password, userExist.password);

            const userData = { ...userExist.toObject() }

            if (checkPassword) {
                const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
                delete userData.password;


                res.status(200).json({ data: userData, success: true, token });
            } else {
                res.status(400).json({ message: 'Invalid Password.' });
            }

        } else {
            res.status(400).json({ message: 'User does not exist.', success: false });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message, success: false });
    }
}

export const userSignup = async (req, res) => {

    try {
        const { email, name, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const pwdHashed = password ? await bcrypt.hash(password, salt) : '';
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).json({ message: 'User already exist.', success: false });
        }

        const newUser = new User({ email, name, password: pwdHashed });

        await newUser.save();

        const userData = { ...newUser.toObject() }

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);

        delete userData.password;

        res.status(200).json({ data: userData, success: true, token });
    } catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
}

export const getUser = async (req, res) => {

    try {
        const _id = req.user;
        const userExist = await User.findOne({ _id })

        if (!userExist) {
            res.status(400).json({ message: 'User does not exist.', success: false });
        }

        const userData = { ...userExist.toObject() }

        delete userData.password;

        res.status(200).json({ data: userData, success: true });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message, success: false });
    }
}


export default router;