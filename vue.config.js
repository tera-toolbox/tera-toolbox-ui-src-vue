let webpack = require("webpack");

module.exports = {
	"assetsDir": "./",
	"productionSourceMap": false,
	"filenameHashing": false,
	"configureWebpack": {
		performance: { hints: false },
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 1
			})
		],
	},
	"chainWebpack": config => {
		config.plugin("html")
			.tap(args => {
				args[0].title = "Tera Toolbox UI";
				return args;
			});
	},
	"css": {
		extract: process.env.NODE_ENV === "production" ? {
			ignoreOrder: true,
		} : false,
	}
};
