const fs = require('fs');
const URL = require('url');
const uri = process.cwd();
const basePath = uri + '/test/answer/';

function clearCache(cfgPath){
    let moudle =require.cache[cfgPath];
    if(!module){
        return;
    }
    if(module.parent){
        moudle.parent.children.splice(module.parent.children.indexOf(module),1);
    }
    require.cache[cfgPath] = null;
}

function watchCfg(){
    const fullPath = require.resolve('./mock-config');
    fs.watch(fullPath,function(e,fileName){
        if('change'===e){
            clearCache(fullPath);
            try{
                require(fullPath);
                console.log('----------change------');
            }catch(e){
                console.log(e);
            }
        }
    })
}

watchCfg();

function getData(req, res, next, type) {
    _getApiData(req, res, next, type);
}

function _getApiUrl(url) {
    const endIndex = url.indexOf('?');
    const path = -1 ===endIndex ? url :url.substring(0, endIndex);
    return basePath + path.replace(/\//g,'_').substr(1)+'.json';
}

function _getApiData(req, res, next, type) {
    const url =req.url;
    console.log(url)
    const path =_getApiUrl(url);
    console.log("_getApiData:",path)
    _getApiDataFromCfg(path,req, res, next, type) || _readFileToRep(path,res,next);
}

function _readFileToRep(path,res,next){
path = path.replace('_.json','.json');
fs.readFile(path,'',(error,data) =>{
    if(error) {
        console.log('path error:'+path);
        next();
    }else{
        res.writeHead(200,{'Content-type':'application/json; charset=utf-8'});
        res.write(data);
        res.end();
    }
})

}


const mockConfig={
    get:{},
    post:{}
}

function _getApiDataFromCfg(path,req, res, next, type) {
    const fn = _getCfgFn(type,req.url);

    if("function" === typeof fn){
        _getData(type,req,function(param){
            try{
                let str =JSON.stringify(fn(param));
                if(str !== 'null') {
                    res.writeJead(200,{'Content-type':'application/json; charset=utf-8'});
                    res.write(str);
                    res.end();
                }else{
                    res.writeJead(404,{'Content-type':'application/json; charset=utf-8'});
                    res.write(str);
                    res.end();
                }
            }catch(e){
                res.writeJead(404,{'Content-type':'application/json; charset=utf-8'});
                res.write(str);
                res.end();
            }
        });
        return true;
    }
}

function _getCfgFn(type,url) {
    let shortedUrl =url.match(/.*\?/);
    shortedUrl = shortedUrl? shortedUrl[0] : url ;
    return mockConfig[type][shortedUrl];
}
function _getData(type,req,callBack) {
    if(type === 'post'){
        let data = '';
        req.on('data',function(chunk){
            data+=chunk;
        });
        req.on('end',function(){
            console.log('data:',data);
            let result = {};
            try{
                result = JSON.parse(data);
            }catch(e){
                console.error(e)
            }

            return callBack(result);
        })
    }else{
        return callBack(URL.parse(req.url,true).query);
    }
}


function setConfig(url,type,fn){
    mockConfig[type][url] = fn;
}

module.exports = {
    mock:setConfig,
    getData:getData
}