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




//   .then((files) => {
//   files.forEach((file) => {
//     const fileData = path.parse(file)
//     const destPath = path.join(distPath, fileData.dir)

//     // create destination directory
//     fse.mkdirs(destPath)
//       .then(() => {
//         // render page
//         return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config))
//       })
//       .then((pageContents) => {
//         // render layout with page contents
//         return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, config, { body: pageContents }))
//       })
//       .then((layoutContent) => {
//         // save the html file
//         fse.writeFile(`${destPath}/${fileData.name}.html`, layoutContent)
//       })
//       .catch((err) => { console.error(err) })
//   })
// })
//   .catch((err) => { console.error(err) })
