const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserService {
    async register(userData) {
        const { username, email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const user = await User.create({ username, email, password });
        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        };
    }

    async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async updateProfile(userId, updateData) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Prevent updating sensitive fields like password here (usually separate logic)
        const { password, email, ...allowedUpdates } = updateData;
        
        await user.update(allowedUpdates);
        
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        return updatedUser;
    }
}

module.exports = new UserService();
