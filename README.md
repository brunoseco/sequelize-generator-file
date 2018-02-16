# SEQUELIZE-GENERATOR-FILE
A Node.js file generator, will be based on Sequelize models

### Under Development
### Current templates work with https://github.com/brunoseco/api-nodejs-seed

## Start
`npm install`

## Templates
Create your templates in folder `templates` and add to `configs = { filesToGenerate: [ { template: "controller", input: "./templates/controller.tpl", output: "./output/controller", ext: "controller.js" } ] }` in `index.js`

## Generate
`npm run gen CLASSNAME` like `npm run gen people`

## Result
Then will be export to `.\sequelize-generator-file\generator\output\controller\people.controller.js`

## Tags Implemented
`<#classNameCapitalize#>` >> People <br />
`<#className#>` >> people <br />

