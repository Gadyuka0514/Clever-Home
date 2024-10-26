const { User } = require('../../db/models');

async function checkUserAdmin(req, res, next) {
  try {
    const { Admin } = req.params;
    const targetMessage = await User.findOne({ where: { isAdmin: Admin } });
    if (targetMessage?.userId === res.locals?.user?.id) return next();
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: error.message });
  }
}

module.exports = checkUserAdmin;
