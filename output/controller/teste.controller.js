'use strict';

const Sequelize = require('sequelize');

const Teste = require('../models/teste');

const controller = require('./controller');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    const filters = req.query;
    const query = controller.queryBase(Teste, filters);
    const results = await Teste.findAll({ where: query });

    res.successResult(results);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Teste.findById(id);

    res.successResult(result);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.post = async (req, res, next) => {
  try {
    const data = req.body;
    data.password = await authService.setPassword(data.password);
    data = controller.transferTo(Teste, data);

    const alvo = await Teste.create(data);
    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};

exports.put = async (req, res, next) => {
  try {

    const data = req.body;
    const id = data.id;
    const alvo = await Teste.findById(id);

    if (!alvo)
      res.errorResult({}, 'Registro não encontrado!');

    if (data.password !== undefined)
      data.password = await authService.setPassword(data.password);

    alvo = controller.transferTo(Teste, data, alvo);

    await alvo.save();
    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};


exports.delete = async (req, res, next) => {
  try {
    const id = req.body.id;
    const alvo = await Teste.findById(id);

    if (!alvo)
      res.errorResult({}, 'Usuário não encontrado!');

    await alvo.destroy();

    res.successResult(alvo);
  } catch (e) {
    res.errorResult(e);
  }
};
