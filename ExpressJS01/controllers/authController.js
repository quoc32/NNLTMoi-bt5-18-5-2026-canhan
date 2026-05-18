const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const user = await userService.register(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }
        const result = await userService.login(email, password);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            ...result
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { register, login };
