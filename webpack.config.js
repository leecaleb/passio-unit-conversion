import { resolve as _resolve, join } from "path";
import { HotModuleReplacementPlugin } from "webpack";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export const entry = "./src/index.tsx";
export const mode = "development";
export const module = {
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
};
export const resolve = {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
};
export const output = {
    path: _resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
};
export const devServer = {
    static: {
        directory: join(__dirname, "public/")
    },
    port: 3000,
    devMiddleware: {
        publicPath: "http://localhost:3000/dist/",
    },
    hot: "only"
};
export const plugins = [
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ESLintPlugin()
];