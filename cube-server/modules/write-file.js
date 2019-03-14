var fs = require("fs");

// console.log("准备写入文件");
function writeCube(cube_str) {
    fs.writeFileSync('CUBE_STATE.txt', cube_str,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
      //   console.log("读取写入的数据！");
      //   fs.readFile('CUBE_STATE.txt', function (err, data) {
      //      if (err) {
      //         return console.error(err);
      //      }
      //      console.log("异步读取文件数据: " + data.toString());
      //   });
     });
}

module.exports = writeCube;