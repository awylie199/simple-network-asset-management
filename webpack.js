const path = require('path'),
    webpack = require('webpack'),
    StyleLintPlugin = require('stylelint-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const plugins = [
    new StyleLintPlugin({
        configFile: './.stylelintrc',
        allowEmptyInput: true,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            PORT: JSON.stringify(process.env.PORT),
            HOST: JSON.stringify(process.env.HOST),
        },
    }),
    new webpack.LoaderOptionsPlugin({
        debug: process.env.NODE_ENV === 'development'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin([path.join(__dirname, 'dist')], {
        verbose: process.env.NODE_ENV === 'development',
    }),
];
const entry = [
    path.join(__dirname, 'client/index.js')
];

let rules = [
    {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [],
        loader: 'eslint-loader',
        include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'server'),
        ]
    },
    {
        loader: 'babel-loader',
        test: /\.js$/,
        include: [
            path.join(__dirname, 'client'),
        ]
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            {
                loader: 'url-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    name: '[hash].[ext]'
                }
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true,
                    mozjpeg: {
                        progressive: true,
                        quality: 70
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    optipng: {
                        enabled: false
                    },
                    pngquant: {
                        quality: '75-90',
                        speed: 3,
                    },
                },
            }
        ]
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]'
    },
    {
        test: /\.s?[c|a]ss$/,
        include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'node_modules'),
        ],
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    minimize: process.env.NODE_ENV !== 'development'
                }
            },
            'postcss-loader',
            'sass-loader',
            'resolve-url-loader',
        ]
    }
];

if (process.env.NODE_ENV === 'development') {
    plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
    );
} else if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            cache: true,
        })
    );
}

module.exports = {
    mode: process.env.NODE_ENV,
    context: __dirname,
    devtool: process.env.NODE_ENV === 'development' ?
        'inline-eval-cheap-source-map' : 'cheap-module-source-map',
    plugins,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    module: {
        rules
    },
    resolve: {
        modules: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'server'),
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.scss', '.json', '.css'],
        alias: {}
    },
    entry
};
