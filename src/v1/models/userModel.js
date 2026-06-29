let users = [];

const findById = (id) => {
    return users.find(user => user.id === id);
};

const findOrCreate = (profile) => {
    let user = findById(profile.id);
    if (!user) {
        user = {
            id: profile.id,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
            displayName: profile.displayName,
            plan: 'FREE' // Standardplan bei Neuregistrierung
        };
        users.push(user);
    }
    return user;
};

const updatePlan = (id, newPlan) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex].plan = newPlan;
        return users[userIndex];
    }
    return null;
};

module.exports = {
    findById,
    findOrCreate,
    updatePlan
};
