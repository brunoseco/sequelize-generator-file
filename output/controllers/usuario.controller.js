'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../sequelize.config');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(100),
    validate: { isEmail: true },
  },
  doc: {
    type: Sequelize.STRING(11),
    validate: { is: /^([0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2})$/g },
    set(value) { this.setDataValue('doc', value.replace(/D/g, '')); }
  },
  celular: {
    type: Sequelize.STRING(16),
    set(value) { this.setDataValue('celular', value.replace(/D/g, '')); }
  },

});

Usuario.sync();

module.exports = Usuario;
