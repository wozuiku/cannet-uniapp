module.exports = {
	publicPath:"./",
	// 解决H5跨域
	devServer: {
		"port": 8099, //浏览器运行端口
		"disableHostCheck": true,
		proxy: {
			'/connect/': { // 配置跨域
				target: "http://124.71.141.53:62162/connect/",
				//secure: true,
				//changeOrigin: true,
				pathRewrite: {
					'^/connect/': ''
				}
			},
			'/api/': {
				target: 'http://124.71.141.53:62162/api/',
				//secure: true,
				//changeOrigin: true,
				pathRewrite: {
					'^/api/': ''
				}
			},

		},

	}
}
