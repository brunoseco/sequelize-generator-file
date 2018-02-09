# sequelize-generator-file
A Node.js file generator, based on Sequelize models


## Start
`npm install`

## Templates
Create your templates in folder `templates` and add to `configs = { filesToGenerate: [ { template: "controller", input: "./templates/controller.tpl", output: "./output/controller", ext: "controller.js" } ] }` in `index.js`

## Generate
`npm run gen CLASSNAME` like `npm run gen people`

## Result
Then will be export to `.\sequelize-generator-file\generator\output\controller\people.controller.js`

##Tags Implemented
`<#classNameCapitalize#>` >> People
`<#className#>` >> people

