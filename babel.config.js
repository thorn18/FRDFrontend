<<<<<<< HEAD
module.exports = function(api) {
    api.cache(true);
    return {
        presets: [['@babel/preset-env', {targets: {node: 'current'}}], 
        '@babel/preset-typescript',
        '@babel/preset-react'
    
    ]
    }
}
=======
module.exports = {

    presets: [
  
    ['@babel/preset-env', {targets: {node: 'current'}}],
  
    '@babel/preset-typescript',

    '@babel/preset-react',
  
    ],
  
  };
>>>>>>> c8dd3308f9d21d64f2c3a499f6a5dfdbe2b6683e
