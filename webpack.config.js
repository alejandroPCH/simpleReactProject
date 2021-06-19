const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin')
const TerserPlugin=require('terser-webpack-plugin')

// in module.export will be all the settings
module.exports={


    entry:'./src/index.js',
    mode:'production',

    output:{
        //remeber that __dirname is where your directory is located
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',
        //you only put publicPath on the .config.js file, this is the path that is going to be publish
        publicPath:"./",

        //you need clean:true because the TerserPlugin will create compressed files... and you will need to remove the older ones
        clean:true,
    },

    // in resolve will use all the extencios the project use
    resolve:{

        extensions:['.js','.jsx'],
        
        //remember you will optimize your files, that's why you need alias 
        alias:{
            '@components':path.resolve(__dirname,'src/components/'),
            '@styles':path.resolve(__dirname,'src/styles/')
        }

    },

    plugins:[
        new HtmlWebpackPlugin({
            //where is your HTML?
            template:'./public/index.html',
            //how the output is going to be called?
            filename:'./index.html'
        }),

        new MiniCssExtractPlugin({
            // as you know...this is going to be the output
            filename:'[name].css'
        }),


    ],

    optimization:{

        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]   
    },



    // remember that module will allocate the rules
    module:{

        rules:[
            {
                // extencions that the project need
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,

                use:{
                    loader:'babel-loader',
                }
            },
            {
                //this is other rule

                test: /\.html$/,
             
                use:[// html-loader is the package you had installed
                    {loader:'html-loader'}
                ]

            },
            {

                test: /\.s?[ac]ss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader']


            }

        ]

    },

}