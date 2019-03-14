const { execSync } = require('child_process');
var fs = require("fs");

function runCube() {
    execSync('./test > solve.txt', (err, stdout, stderr) => {
        if(err) {
            console.log(err);
            return stderr;
        }
    });
    console.log("读取写入的数据！");
    let recover_str = fs.readFileSync('solve.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
        return data.toString();
    });
    return recover_str.toString();
}


module.exports = runCube;