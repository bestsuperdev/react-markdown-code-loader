'use strict';
var fs = require('fs')
var path = require('path')
const
  build = require('./build.js'),
  parser = require('./parser.js');

let content = fs.readFileSync(path.join(__dirname, '../test/examples/hello-world.md'))
content = content.toString()

parser.parse(content).then((res)=>{
  console.log(res.html)
  console.log(res.attributes)
  console.log(build(res))
})

/**
 * Main function
 * @param   {String}  content   Markdown file content
 */
module.exports = function (content) {

  const callback = this.async();

  parser
    .parse(content)
    .then(build)
    .then(component => callback(null, component))
    .catch(callback);

};

