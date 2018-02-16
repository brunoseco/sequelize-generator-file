'use strict';

const Sequelize = require('sequelize');

const Usuario = require('../models/usuario');

const controller = require('./controller');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    const filters = req.query;
    const query = controller.queryBase(Usuario, filters);
    const results = await Usuario.findAll({ where: query });

    res.successResult(results);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Usuario.findById(id);

    res.successResult(result);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.post = async (req, res, next) => {
  try {
    const data = req.body;
    data.password = await authService.setPassword(data.password);
    data = controller.transferTo(Usuario, data);

    const alvo = await Usuario.create(data);
    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.put = async (req, res, next) => {
  try {

    const data = req.body;
    const id = data.id;
    const alvo = await Usuario.findById(id);

    if (!alvo)
      res.errorResult({}, 'Registro não encontrado!');

    alvo = controller.transferTo(Usuario, data, alvo);
    await alvo.save();
    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    const id = req.body.id;
    const alvo = await Usuario.findById(id);

    if (!alvo)
      res.errorResult({}, 'Registro não encontrado!');

    await alvo.destroy();

    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};
