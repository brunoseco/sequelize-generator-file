const fse = require('fs-extra')
const path = require('path')
const { promisify } = require('util')
const glob = require('glob')

const classToGerenerate = process.argv[2];
console.log(classToGerenerate)

const configs = {
  filesToGenerate: [
    { template: "controller", input: "./templates/controller.tpl", output: "./output/controller", ext: "controller.js" },
    { template: "route", input: "./templates/route.tpl", output: "./output/route", ext: "route.js" },
  ]
};

configs.filesToGenerate.forEach((element, index, array) => {

  fse.readFile(element.input, 'utf8', (err, data) => {
    if (err) throw err;

    data = data.replace(new RegExp(/<#classNameCapitalize#>/, 'g'), classToGerenerate.replace(/(^|\s)\S/g, l => l.toUpperCase()));
    data = data.replace(new RegExp(/<#className#>/, 'g'), classToGerenerate);

    fse.mkdirs(element.output, () => {
      fse.writeFile(`${element.output}/${classToGerenerate}.${element.ext}`, data)
    })

  });

});
