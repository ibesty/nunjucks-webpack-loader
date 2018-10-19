### how to use

```
	{
		test: /\.njk|nunjucks/,
		use: ['html-withimg-loader', {
				loader: 'nunjucks-webpack-loader',
				options : {
					alias: {
						pages : path.resolve(__dirname, '../src/pages'),
            components: path.resolve(__dirname, '../src/components'),
            layouts: path.resolve(__dirname, '../src/layouts')
					},
					tags: {
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