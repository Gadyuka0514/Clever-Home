
function removeXPoweredBy(req, res, next) {
  res.removeHeader('x-powered-by')
  next()
}

function checkId(req, res, next) {
  const { id } = req.params
  if (Number(id)) {
    next()
  } else {
    res.status(400).send(`Неверный тип данных для id.`)
  }
}


module.exports = {removeXPoweredBy, checkId}
