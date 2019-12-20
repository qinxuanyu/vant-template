const production =  process.env.NODE_ENV === 'production';
module.exports = {
    lintOnSave: false,
    publicPath:production ? "page" : '/',
    productionSourceMap:false,
    css:{
        loaderOptions: {
            less: {
                modifyVars: {
                    'red': '#ee0a24',
                    'blue': '#FF7A1D',
                    'orange': '#f08d49',
                    'green': '#FF7A1D',          //主题色
                    'background-color': '#FF7A1D'
                    
                },
                javascriptEnabled: true
            }
        }
    },
    devServer: {
     
        proxy: {
          '/': {
            target: `https://jp.liabar.cn`,
            changOrigin: true, // 允许跨域
            ws: false,
          }
        },
    
      },
}