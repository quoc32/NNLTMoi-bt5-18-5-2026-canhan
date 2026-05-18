const userService = require('../services/userService');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await userService.getProfile(userId);
        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updatedProfile = await userService.updateProfile(userId, req.body);
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedProfile
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getProfile, updateProfile };
