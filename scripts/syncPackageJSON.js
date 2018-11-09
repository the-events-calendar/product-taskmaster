const prettier = require('prettier');
const {writeFileSync, readFileSync} = require('fs');
const {resolve} = require('path');

// Resolve package.json from current working root
const currentPackageJSON = JSON.parse(
    readFileSync(resolve(process.env.PWD, 'package.json'), 'utf8')
);

// Fetch common repo package.json
require('./fetchPackageJSON').then((commonJSON)=>{
    currentPackageJSON.dependencies = Object.assign( {}, currentPackageJSON.dependencies, commonJSON.dependencies );
    currentPackageJSON.devDependencies = Object.assign( {}, currentPackageJSON.devDependencies, commonJSON.devDependencies );
    const json = prettier.format(JSON.stringify(currentPackageJSON), {
        parser: 'json'
    });
    writeFileSync('package.json', json );
});


