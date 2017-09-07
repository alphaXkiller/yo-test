const cLogger = (req, res, next) => {
  console.log(
    `Franklin Logger: ${req.hostname} ${req.originalUrl}`
  )

  return next()
}

export default cLogger
