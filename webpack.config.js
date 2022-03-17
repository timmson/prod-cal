const path = require("path");
const outputDir = path.resolve(__dirname, "./");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: outputDir,
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: "ts-loader",
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    }
};