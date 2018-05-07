const express = require('express');
const router = express.Router();

const model = require('../models/items');

/* GET home page. */
router.get('/', (req, res, next) => {
  return model.getAllItems()
    .then(items => {
      res.render('index', { title: 'TODO', items: items });
    });
});

router.get('/add', (req, res, next) => {
  res.render('add', { title: 'Add new item' });
});

router.post('/add', (req, res, next) => {
  return model.add(req.body.title, req.body.description)
    .then(() => model.getAllItems())
    .then(items => {
      res.render('index', { title: 'TODO', items: items });
    });
});

router.get('/delete/:id', (req, res, next) => {
  return model.delete(req.params.id)
    .then(() => model.getAllItems())
    .then(items => {
      res.render('index', { title: 'TODO', items: items });
    });
});
module.exports = router;
