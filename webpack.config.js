const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	entry: "./src/index.tsx",
	mode: "development",
	module: {
		rules: [
			{
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
		]
	},
	resolve: { extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"], },
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js"
	},
	devServer: {
		static : {
			directory: path.join(__dirname, "public/")
		},
		port: 3000,
		devMiddleware:{
			publicPath: "http://localhost:3000/dist/",
		},
		hot: "only"
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
        new ESLintPlugin()
	]
};