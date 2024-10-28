const { Router } = require('express');
const { User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const profileRouter = Router();


profileRouter.route('/').get(async (req, res) => {
  try {
    const profile = await User.findAll();
    res.json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ text: 'Ошибка получения сообщений', message: error.message });
  }
});

profileRouter
  .route('/:profileId')
  .get(async (req, res) => {
    try {
      const profile = await User.findByPk(req.params.profileId);
      res.json(profile);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
  })
  .patch(verifyAccessToken, checkUserAdmin, async (req, res) => {
    try {
      const { profileName, password, email, isActive, state } = req.body;
      const profile = await User.findByPk(req.params.messageId);
      await profile.update({ profileName, password, email, isActive, state });
      res.json(profile);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка обновления сообщения', message: error.message });
    }
  });

module.exports = profileRouter;
