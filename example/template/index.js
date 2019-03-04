const index = require('val-loader!./index.njk?func');
const indexHtml = index.render({ otherContext: 'otherContext' });

module.exports = indexHtml