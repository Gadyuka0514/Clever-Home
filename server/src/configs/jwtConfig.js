const jwtConfig = {
  access: {
    expiresIn: `${1000 * 300}`, // 5 минут
  },
  refresh: {
    expiresIn: `${1000 * 60 * 60 * 12}`, // 12 часов
  },
};

module.exports = jwtConfig;
