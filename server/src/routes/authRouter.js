const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

authRouter.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, password: hashpass },
  });
  if (!created) {
    return res.status(400).json({ text: 'Почта уже используется' });
  }

  const user = newUser.get();
  delete user.hashpass;
  const { refreshToken, accessToken } = generateTokens({ user });
  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieConfig)
    .json({ user, accessToken });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const targetUser = await User.findOne({ where: { email } });
  console.log("🚀 ~ authRouter.post ~ targetUser:", targetUser)
  
  if (!targetUser) {
    console.log("🚀 ~ authRouter.post ~ targetUser:", targetUser)
    return res.status(400).json({ text: 'Неверный email' });
  }
  const isValid = await bcrypt.compare(password, targetUser.password);
  console.log("🚀 ~ authRouter.post ~ targetUser:", targetUser)
  
  if (!isValid) {
    return res.status(400).json({ text: 'Неверный пароль' });
  }

  const user = targetUser.get();
  console.log("🚀 ~ authRouter.post ~ targetUser:", targetUser)
  delete user.hashpass;
  const { refreshToken, accessToken } = generateTokens({ user });
  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieConfig)
    .json({ user, accessToken });
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').status(200).send('Logout successfull!');
});

module.exports = authRouter;
