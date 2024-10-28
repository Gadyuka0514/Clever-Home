const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const roomsRouter = require('./routes/roomsRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const profileRouter = require('./routes/profileRouter');
const { removeXPoweredBy } = require('./middlewares/common');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(removeXPoweredBy);
app.use(express.static('public'));
app.use(express.json());

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/profile', profileRouter);

module.exports = app;
