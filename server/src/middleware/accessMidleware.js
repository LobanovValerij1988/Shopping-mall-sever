const forAdminOnly = async (req, res, next) => {
    if(!req.roles.some(role => role === 'admin')) {
        return res.status(400).json({
            error: 'only for admin',
        });
    }
    next();
}

const forManagerOnly = async (req, res, next) => {
    if(!req.roles.some(role => role === 'manager')) {
        return res.status(400).json({
            error: 'only for manager',
        });
    }
    next();
}

module.exports = {
    forManagerOnly,
    forAdminOnly
};