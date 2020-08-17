// 获取本地ip地址
exports.getLocalIpAddress = () => {
    const os = require('os');
    let interfaces = os.networkInterfaces()
    let localIpaddress
    for (let devName in interfaces) {
        interfaces[devName].forEach((item) => {
            if (item.family == 'IPv4' && !item.internal) {
                localIpaddress = item.address
            }
        })
    }
    return localIpaddress
}
// 获取没被占用的端口
exports.getFreePort = (port) => {
    return new Promise((resolve, reject) => {
        const portfinder = require('portfinder');
        portfinder.basePort = port || '8080';
        portfinder.getPort((err, port) => {
            if (err) {
                reject(err);
            } else {
                resolve(port);
            }
        })
    })
}