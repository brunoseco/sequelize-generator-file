'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../sequelize.config');

const <#classNameCapitalize#> = sequelize.define('<#classNameCapitalize#>', {
<#modelFields#>
});

<#classNameCapitalize#>.sync();

module.exports = <#classNameCapitalize#>;
