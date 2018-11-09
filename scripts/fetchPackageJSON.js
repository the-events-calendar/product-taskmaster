const https = require('https');
const {createReadStream} = require('fs');
const {resolve} = require('path');

module.exports = new Promise((resolve, reject)=>{
    // TODO: Change to use master branch
    https.get('https://raw.githubusercontent.com/moderntribe/tribe-common/task/gutenberg-merge/package.json', response => {
        let data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => data += chunk );
        response.on('abort', reject );
        response.on('end', () => {
            try {
                resolve( JSON.parse(data) );
            } catch (e) {
                reject(e);
            }
        } );
    });
});