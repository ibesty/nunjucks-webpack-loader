const chardet = require('chardet');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const nunjucks = require('nunjucks');
const path = require('path');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};

  const njkLoader = (startPath, alias) => {
    const resolvePath = filePath => {
      if (typeof alias === 'object') {
        for (key in alias) {
          const patt = new RegExp(`^~${key}`);
  
          if (patt.test(filePath)) {
            return path.join(alias[key], filePath.replace(patt, ''));
          }
        }
      }
  
      return path.resolve(startPath, filePath);
    };
  
    return {
      getSource: filePath => {
        const completePath = resolvePath(filePath);
        this.addDependency(completePath);
        const dataBuffer = fs.readFileSync(completePath);
        // const charset = chardet.detect(dataBuffer);
  
        return {
          src: dataBuffer
            .toString('UTF-8', 0, dataBuffer.length)
            .replace(/({%.+?)>(.+?%})/gi, '$1&gt;$2')
            .replace(/({%.+?)<(.+?%})/gi, '$1&lt;$2'), //将 > < 替换成实体字符,
          path: completePath
        };
      }
    };
  };

  if (options.tags) {
    source = source
      .replace(/({%.+?)>(.+?%})/gi, '$1&gt;$2')
      .replace(/({%.+?)<(.+?%})/gi, '$1&lt;$2'); //将 > < 替换成实体字符
  }
  const env = new nunjucks.Environment(njkLoader(this.context, options.alias), {
    tags: options.tags
  });
  const compiled = nunjucks.compile(source, env);
  const rendered = compiled.render(options.context || {});

  return rendered;
}
