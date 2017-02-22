'use strict';

const
  frontMatter = require('front-matter'),
  Prism = require('node-prismjs'),
  Remarkable = require('remarkable'),
  escapeHtml = require('remarkable/lib/common/utils').escapeHtml,
  md = new Remarkable();


/**
 * @typedef MarkdownObject
 * @type {Object}
 * @property {Object} attributes - Map of properties from the front matter
 * @property {String} body       - Markdown
 */

/**
 * @typedef HTMLObject
 * @type {Object}
 * @property {String} html    - HTML parsed from markdown
 * @property {Object} imports - Map of dependencies
 */

/**
 * Parse Markdown to HTML with code blocks
 * @param   {MarkdownObject} markdown - Markdown attributes and body
 * @returns {HTMLObject}                HTML and imports
 */
function parseMarkdown(markdown) {
  markdown.attributes = markdown.attributes || {}
  return new Promise((resolve, reject) => {
    let html;

    const options = {
      highlight(code, lang) {
        const language = Prism.languages[lang] || Prism.languages.autoit;
        return Prism.highlight(code, language);
      },
      xhtmlOut: true
    };

    md.set(options);
    md.renderer.rules.fence_custom.attributes = (tokens, idx, options) => {
      // add attributes

      const codeTags = tokens[idx].params.split(/\s+/g)
      if(!markdown.attributes[codeTags[1]]){
        markdown.attributes[codeTags[1]] = []
      }
      markdown.attributes[codeTags[1]].push(tokens[idx].content)
      
      return ''

    };
    md.renderer.rules.fence_custom.render = (tokens, idx, options) => {
      // gets tags applied to fence blocks ```react html
      const codeTags = tokens[idx].params.split(/\s+/g);
      return tokens[idx].content 
    };

    try {
      html = md.render(markdown.body);
      resolve({ html, attributes: markdown.attributes });
    } catch (err) {
      return reject(err);
    }

  });
}

/**
 * Extract FrontMatter from markdown
 * and return a separate object with keys
 * and a markdown body
 * @param   {String} markdown - Markdown string to be parsed
 * @returns {MarkdownObject}    Markdown attributes and body
 */
function parseFrontMatter(markdown) {
  return frontMatter(markdown);
}

/**
 * Parse markdown, extract the front matter
 * and return the body and imports
 * @param  {String} markdown - Markdown string to be parsed
 * @returns {HTMLObject}       HTML and imports
 */
function parse(markdown) {
  return parseMarkdown(parseFrontMatter(markdown));
}

module.exports = {
  parse,
  parseFrontMatter,
  parseMarkdown
};
