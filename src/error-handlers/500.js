'use strict';

module.exports = (error, req, res, next) => {
  res.status(500).send('Gurrl something went wrong');
};