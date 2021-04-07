module.exports = function(req, res, next) {
  req.method = 'GET';
  req.query._time = new Date().getTime();
  next();
};
