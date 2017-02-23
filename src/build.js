'use strict';
const camelize = require('camelize')
const except = require('except')

/**
 * @typedef HTMLObject
 * @type {Object}
 * @property {String} html    - HTML parsed from markdown
 * @property {Object} imports - Map of dependencies
 */

/**
 * Builds the React Component from markdown content
 * with its dependencies
 * @param   {HTMLObject} markdown - HTML and imports
 * @returns {String}              - React Component
 */
module.exports = function build(markdown) {

	const doImports = ['import React from \'react\';\n']
	const doExports = []
	const imports = markdown.attributes.imports || {} 
	const requires = markdown.attributes.requires || [] 
	const exports = markdown.attributes.exports || [] 
	const jsx = markdown.html.replace(/class=/g, 'className=')

	const frontMatterAttributes = except(markdown.attributes, 'imports','requires','exports')

	for (const key in imports) {
		// eslint-disable-next-line no-prototype-builtins
		if (imports.hasOwnProperty(key)) {
			doImports.push(`import ${key} from '${imports[key]}';\n`)
		}
	}
	requires.forEach((style)=>{
		doImports.push(`require('${style}');\n`)
	})
	if(exports && exports.length > 0){
		doExports.push(`attributes.exports = [${exports.join(',')}];\n`)
		// doExports.push(`attributes.exports`)
	}
	return `
${doImports.join('')}
		
const attributes = ${JSON.stringify(camelize(frontMatterAttributes))};
		
${doExports.join('')}

export {attributes}
export default function() {
	return (
		<div>
			${jsx}
		</div>
	);
};`;
};
