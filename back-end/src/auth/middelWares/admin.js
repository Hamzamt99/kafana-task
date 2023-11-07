module.exports = async (req, res, next) => {
    try {
        let role = req.users.role
        if (role === 'admin') {
            next()
        } else {
            next('acsses denied')
        }
    } catch (err) {
        next(err)
    }
}