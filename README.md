# nunjucks-webpack-loader
[![NPM version][npm-image]][npm-url]

Nunjucks loader for webpack, support `include`, `extends` and `Customizing Syntax`.

[Features](#features) | [Installation](#installation) | [Usage](#usage) | [Examples](#examples) | [Command-line options](#options) | [Configuration](#configuration)


## Features

 - **Load nunjucks template file in webpack:** You can use it with html-webpack-loader.

 - **Support `include` and `extends`:** Use `include` and `extends` with folder alias in file.

 - **Customizing Syntax:** If you want different tokens than {{ and the rest for variables, blocks, and comments, you can specify different tokens as the tags option.
## Installation

```bash
$ npm i nunjucks-webpack-loader
```

## Usage
In your webpack.config.js and add to rules block:
```js
    {
        test: /\.njk|nunjucks/,
        use: ['html-withimg-loader', { // use html-loader or html-withimg-loader to handle inline resource
                loader: 'nunjucks-webpack-loader', // add nunjucks-webpack-loader
                options : {
                    alias: { // add alias and you can use it in your template
                        pages : path.resolve(__dirname, '../src/pages'),
                        components: path.resolve(__dirname, '../src/components'),
                        layouts: path.resolve(__dirname, '../src/layouts')
                    },
                    tags: { // if you want to use different tokens
                        blockStart: '@{%',
                        blockEnd: '%}',
                        variableStart: '@{{',
                        variableEnd: '}}',
                        commentStart: '{#',
                        commentEnd: '#}'
                    }
                }
        }]
    },
```

## In template file

```twig
{% include '~pages/sometemplate.njk' %} // ~pages is alias to pages folder
```

## Authors

[Bestie](https://github.com/ibesty)

## License

[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v//nunjucks-webpack-loader.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/nunjucks-webpack-loader