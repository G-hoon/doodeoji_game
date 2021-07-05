const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
    mode: 'development',
    entry: {
        index: "./source/index.ts"
    },
    // for importing something in ts or js file
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name]_bundle.js'
    },
    module: {
        rules: [
            {
                // Fot loading TS file
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'source')]
            },
            {
                // For loading CSS
                test: /\.css$/,
                use: [
                    // 가져온 css를 웹 페이지 안에 style로 주입해주는 로더
                    'style-loader',
                    // css 파일 읽어와서 웹펙에 가져오는 로더 (로더는 뒤쪽에 있는게 먼저 실행 - 체이닝)
                    'css-loader'
                ]
            },
            {
                // For loading image file
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // 원본 파일 이미지로 dist 에 생성
                        name: '[name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 최종 완성된 HTML을 생성하기 위한 플러그인 (플러그인이 자동으로 외부 파일들을 넣어줌)
        new HtmlWebpackPlugin({
            // 소스
            template: './source/index.html',
            // 출력할 파일 이름
            filename: './index.html',
            // HTML에 삽입할 script key
            chunks: ['index']
        }),
        // 자동으로 dist 파일 청소후 다시 만들어 줌
        new CleanWebpackPlugin()
    ],
    devServer: {
        port: 9000,
        open: true
    }

}