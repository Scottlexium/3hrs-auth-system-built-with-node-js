const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const gravatar = require('gravatar');
const JWT_SECRET = "cniecnicnieiencie";
module.exports.register_post = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'Username already exists', code: "E11000" });
        const url = gravatar.url(email, { s: '200', r: 'pg', d: '404' });
        // hash password
        const SALT = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, SALT);
        if (!hashedPassword) return res.status(400).json({ message: 'Password hashing failed' })
        const user = new User({ username, email, password: hashedPassword, avatar: url });
        await user.save();
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '3m' });
        return res.status(200).json({ message: 'User registered successfully', user, token })
        // save user to User collection
    } catch (err) { return res.status(500).json({ message: err.message }); }
}
// @login route
module.exports.login_post = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Password is incorrect' });
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '3m' });
        return res.status(200).json({ message: 'User logged in successfully', user, token })
    } catch (err) { return res.status(500).json({ message: err.message }); }
}