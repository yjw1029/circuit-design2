# circuit-design2
中科大电子设计2 魔方机器人项目

建立了一个自动还原魔方的机器人：可实现在浏览器上控制真实魔方旋转，点击按键使魔方还原的功能。基于esp8266的局域网模块传递tcp信息实现。

本目录下文件实现功能：使用tcp协议传递信息，魔方网站httpd搭建，记录魔方状态

#### cube-server 目录

* 主要代码在modules下

  * cube-status：记录魔方状态
  * net：tcp服务器
  * write-files：将魔方状态写入CUBE_STATE.txt
  * test-serve: 模拟对端esp8266
  * SOLVECUBE.cpp: 还原魔方程序

* view 目录为网站静态文件


