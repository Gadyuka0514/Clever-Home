const { Router } = require('express');
const { User, Room, House } = require('../../db/models');
const upload = require('../middlewares/upload');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const roomRouter = Router();

roomRouter
  .route('/dashboard')
  .get(async (req, res) => {
    try {
      const rooms = await Room.findAll({ order: [['id', 'DESC']] });
      res.json(rooms);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
  })

  roomRouter.route('/rooms').get(async (req, res) => {
    try {
      const rooms = await Room.findAll({ order: [['id', 'DESC']] });
      res.json(rooms);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
  });

// roomRouter.get('/', verifyAccessToken, async (req, res) => {
//   try {
//     const user = await User.findAll({ where: { id: res.locals.user.id } });
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ text: 'Ошибка получения сообщения', message: error.message });
//   }
// });

roomRouter
  .route('/:roomId')
  .patch(verifyAccessToken, checkUserAdmin, async (req, res) => {
    try {
      const { roomName, isActive, state } = req.body;
      const room = await Room.findByPk(req.params.messageId);
      await room.update({ roomName, isActive, state });
      res.json(room);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка обновления сообщения', message: error.message });
    }
  })
  .delete(verifyAccessToken, checkUserAdmin, async (req, res) => {
    try {
      const room = await Room.findByPk(req.params.messageId);
      //   await removeImage(message.img); // Раскомментируй, чтобы картинки не засоряли память
      await room.destroy();
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ text: 'Ошибка удаления сообщения', message: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const room = await Room.findByPk(req.params.messageId);
      res.json(room);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
  });


module.exports = roomRouter;
