const { Router } = require('express');
const { Room } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const roomRouter = Router();

roomRouter
  .route('/dashboard')
  .get(async (req, res) => {
    try {
      const rooms = await Room.findAll();
      res.json(rooms);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
  })


  roomRouter.route('/').get(async (req, res) => {
    try {
      const rooms = await Room.findAll();      
      res.json(rooms);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщений', message: error.message });
    }
      
  });

roomRouter
  .route('/:roomId')
  .get(async (req, res) => {
    try {
      const room = await Room.findByPk(req.params.roomId); 
      res.json(room);      
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ text: 'Ошибка получения сообщения', message: error.message });
    }
      
      
  })
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
  });


module.exports = roomRouter;
