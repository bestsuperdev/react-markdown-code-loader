'use strict';

const
  fs = require('fs'),
  path = require('path'),
  build = require('../src/build.js'),
  parser = require('../src/parser.js');

describe('Build Component', () => {

  let component = '';
  const mdFile = path.join(__dirname, './examples/hello-world.md');

  before(done => {
    fs.readFile(mdFile, 'utf8', (err, data) => {
      if (err) {
        return done(err);
      }
      parser
        .parse(data)
        .then(html => {
          component = build(html);
          fs.writeFileSync(path.join(__dirname,'../log.js'),component)
          done();
        })
        .catch(done);
    });
  });

  it('add React import', () => {
    component.should.contain('import React from \'react\';\n');
  });

  it('add component imports and requires ', () => {
    component.should.contain('import Button from \'./button.js\';\n');
    component.should.contain('import HelloWorld from \'./hello-world.js\';\n');
    component.should.contain('require(\'./hello-world.css\');\n');
    component.should.contain('require(\'./button.css\');\n');
  });

  it('exports the front-matter attributes', () => {
    component.should.contain('const attributes = {"testFrontMatter":"hello world","codes":["var who = \'world\'\\n"]}');
    component.should.contain('export {attributes}')
  });

  it('exports the exports attributes from imports ', () => {
    component.should.contain('attributes.exports = [Button,HelloWorld]')
  });

});
