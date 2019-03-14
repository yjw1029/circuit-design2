const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const path = require('path')
const static = require('koa-static')
const staticPath = './view'
const {sendRotate, sendRecover} = require('./modules/net')
const Cube = require('./modules/cube-status')
const wirteCube = require('./modules/write-file')
const runCube = require('./modules/run-cube')
app.use(bodyParser());

app.use(static(
  path.join( __dirname,  staticPath)
))

let cube = new Cube();
cube.init();

function judgeDir(robj) {
    let dir_reverse;
    switch(robj.type) {
        case 'front': dir_reverse = false;break;
        case 'back': dir_reverse = true;break;
        case 'top': dir_reverse = false;break;
        case 'bottom': dir_reverse = true;break;
        case 'left': dir_reverse = true;break;
        case 'right':dir_reverse = false;break;
    }
    let dir;
    if(dir_reverse){
        dir = robj.dir === '1'? 1:0;
    } else {
        dir = robj.dir === '1'? 0:1;
    }
    return dir;
}

let router = new Router();

router.post('/', async ( ctx )=> {
    let request = ctx.request.body;
    console.log(request);
    let dir = judgeDir(request);
    cube.rotate(request.type, dir);
    // cube.print_cube();
    sendRotate(request.type, dir);
    ctx.response.body = 'hello koa2';
});

router.get('/recover', async ( ctx )=> {
    let cube_str = cube.print_cube();
    // wirteCube(cube_str);
    let resolve_str = await runCube();
    resolve_str = resolve_str? resolve_str: '';
    sendRecover('$' + resolve_str + '~');
    ctx.response.body = 'hello cube';
});

router.get('/init', async ( ctx )=> {
    cube.init();
    ctx.response.body = 'hello init';
});

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000,"0.0.0.0")
console.log('[demo] start-quick is starting at port 3000')