const isUser = (req, res, next) => {
  try {
    if (req.user) next()
    else res.status(401).send('Must login to access')
  } catch (error) {
    next(error)
  }
}

module.exports = {isUser}
