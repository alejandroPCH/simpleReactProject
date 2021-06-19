const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')


// in module.export will be all the settings
module.exports={


    entry:'./src/index.js',
    //in the file .dev allways a development mode is necessary
    mode:'development',

    output:{
        //remeber that __dirname is where your directory is located
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js',

    },

    // in resolve will use all the extencios the project use
    resolve:{

        extensions:['.js','.jsx']

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
        })
    ],



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

    devServer:{
        
        contentBase:path.join(__dirname,'dist'),
                                    // remember that dist is  the output you specified 
        compress:true,
        port:3000,
        open:true,
    }
}