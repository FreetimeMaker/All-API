const userModel = require('../models/userModel');

const getOrCreateUser = (profile) => {
    return userModel.findOrCreate(profile);
};

const getUserById = (id) => {
    return userModel.findById(id);
};

const upgradeUserPlan = (userId, plan) => {
    return userModel.updatePlan(userId, plan);
};

module.exports = {
    getOrCreateUser,
    getUserById,
    upgradeUserPlan
};
