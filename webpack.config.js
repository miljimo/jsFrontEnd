

"use strict"
var path = require('path')
var APP_DIR   = __dirname+"/src/portal/clients/webclient/";
var BUILD_DIR = __dirname+"/src/portal/";

var config ={
   entry:APP_DIR+"/entry.js",
   output:{
   	 filename:"app_build.js",
   	 path:BUILD_DIR
   },
module: {
  loaders: [
    { test: /\.css$/, loader: "style-loader!css-loader" },  
    { test: /\.(png|jpg|gif)$/, loader: 'file-loader' }, 
    { test: /\.useable\.css$/, loader: "style/useable!css" },
    {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    },
  ]
}

}

module.exports = config;

 