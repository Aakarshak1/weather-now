module.exports = (error, req, res, next) => {
  console.log('error triggerd');
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
};
