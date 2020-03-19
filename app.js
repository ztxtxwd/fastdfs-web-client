//1.引入express模块
const express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
const FdfsClient = require('fdfs')
// const fs = require('fs')
const fdfs = new FdfsClient({
    trackers: [
        {
            host: '192.168.10.198',
            port: 30080
        },
        //{
        //    host: '192.168.0.12',
        //    port: 22122
        //}
    ],
    timeout: 10000,
    defaultExt: '',
    charset: 'utf8'
});

//2.创建app对象
const app = express()
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 单图上传
// eslint-disable-next-line no-unused-vars
app.post('/fileUpload', upload.single('file'), function(req, res, next){
    fdfs.upload('uploads/'+req.file.filename).then(function(fileId) {
        // fileId 为 group + '/' + filename
        console.log(fileId);
    }).catch(function(err) {
        console.error(err)
    })
    res.send({ret_code: '0'});
});

//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})
