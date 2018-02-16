const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')

const config = require('./config.json')

console.log("== Iniciando gerando")

String.prototype.capitalize = function () { return this.replace(/(^|\s)\S/g, l => l.toUpperCase()); }

for (let model of config.models) {

  const modelName = model.name;
  console.log("==== Classe gerada > " + modelName);

  for (let template of model.templates) {

    const file = config.templateFiles.filter(_ => _.name == template)[0];

    var textFile = fse.readFileSync(file.input, 'utf8');

    textFile = textFile.replace(new RegExp(/<#classNameCapitalize#>/, 'g'), modelName.capitalize());
    textFile = textFile.replace(new RegExp(/<#className#>/, 'g'), modelName);

    var textFields = "";
    var modelFields = model.fields.map(field => {

      var modelField = config.templateFiles.filter(_ => _.name == 'model.field.default')[0];
      var textModelField = fse.readFileSync(modelField.input, 'utf8');
      var typeSequelize = "Sequelize.STRING";

      if (field.type == "int") {
        typeSequelize = 'Sequelize.INTEGER';
      }

      if (field.type == "string") {
        typeSequelize = 'Sequelize.STRING';
        if (field.maxLength) typeSequelize = `Sequelize.STRING(${field.maxLength})`;
      }

      if (field.type == "decimal") {
        typeSequelize = 'Sequelize.DECIMAL';
        if (field.maxLength) typeSequelize = `Sequelize.DECIMAL(${field.maxLength})`;
      }

      if (field.type == "date") {
        typeSequelize = 'Sequelize.DATE';
      }

      if (field.type == "bool") {
        typeSequelize = 'Sequelize.BOOLEAN';
      }

      if (field.type == "email") {
        typeSequelize = 'Sequelize.STRING(100)';
        if (field.maxLength) typeSequelize = `Sequelize.STRING(${field.maxLength})`;
        textModelField = textModelField.replace(new RegExp(/<#validateType#>/, 'g'), 'isEmail: true');
      }

      if (field.type == "cpfcnpj") {
        typeSequelize = 'Sequelize.STRING(14)';
        textModelField = textModelField.replace(new RegExp(/<#validateType#>/, 'g'), 'is: ^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/g');
        textModelField = textModelField.replace(new RegExp(/<#setter#>/, 'g'), `set(value) { this.setDataValue('<#propertyName#>', value.replace(/\D/g, '')); }`);
      }

      if (field.type == "cpf") {
        typeSequelize = 'Sequelize.STRING(11)';
        textModelField = textModelField.replace(new RegExp(/<#validateType#>/, 'g'), 'is: /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/g');
        textModelField = textModelField.replace(new RegExp(/<#setter#>/, 'g'), `set(value) { this.setDataValue('<#propertyName#>', value.replace(/\D/g, '')); }`);
      }

      if (field.type == "cnpj") {
        typeSequelize = 'Sequelize.STRING(14)';
        textModelField = textModelField.replace(new RegExp(/<#validateType#>/, 'g'), 'is: /^([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/g');
        textModelField = textModelField.replace(new RegExp(/<#setter#>/, 'g'), `set(value) { this.setDataValue('<#propertyName#>', value.replace(/\D/g, '')); }`);
      }

      if (field.type == "phone") {
        typeSequelize = 'Sequelize.STRING(16)';
        textModelField = textModelField.replace(new RegExp(/<#setter#>/, 'g'), `set(value) { this.setDataValue('<#propertyName#>', value.replace(/\D/g, '')); }`);
      }

      if (!!field.autoIncrement) textModelField = textModelField.replace(new RegExp(/<#autoIncrement#>/, 'g'), 'true');
      else textModelField = textModelField.replace(new RegExp(/.*<#autoIncrement#>(.*\r?\n){1}/, 'g'), '');

      if (!!field.primaryKey) textModelField = textModelField.replace(new RegExp(/<#primaryKey#>/, 'g'), 'true');
      else textModelField = textModelField.replace(new RegExp(/.*<#primaryKey#>(.*\r?\n){1}/, 'g'), '');

      if (!!field.allowNull) textModelField = textModelField.replace(new RegExp(/<#allowNull#>/, 'g'), 'true');
      else textModelField = textModelField.replace(new RegExp(/.*<#allowNull#>(.*\r?\n){1}/, 'g'), '');

      textModelField = textModelField.replace(new RegExp(/.*<#validateType#>(.*\r?\n){1}/, 'g'), '');
      textModelField = textModelField.replace(new RegExp(/.*<#setter#>(.*\r?\n){1}/, 'g'), '');

      textModelField = textModelField.replace(new RegExp(/<#typeSequelize#>/, 'g'), typeSequelize);
      textModelField = textModelField.replace(new RegExp(/<#propertyName#>/, 'g'), field.propertyName);

      textFields += textModelField;
    });

    textFile = textFile.replace(new RegExp(/<#modelFields#>/, 'g'), textFields);

    if (file.output) {
      fse.mkdirs(file.output, () => {
        fse.writeFile(`${file.output}/${modelName}.${file.ext}`, textFile);
      });
    }

  }

}

