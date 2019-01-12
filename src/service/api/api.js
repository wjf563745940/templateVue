import axios from 'axios'
import Qs from 'qs'

const CancelToken = axios.CancelToken;

const service = axios.create({
    timeout: 5000,
    transformRequest: [function (data) {
        if (data instanceof FormData) {
            return data;
        } else {
            return qs.stringify(data);
        }
    }],
    withCredentials: true
});

//封装
// POST传参序列化
axios.interceptors.request.use(
    config => {
      if (config.method === 'post' && config.headers.post['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8' && !config.headers['Content-Type']) {
        config.data = Qs.stringify(config.data)
      }
      if (cookieUtil.get('csrfToken') && !(/^(GET|HEAD|OPTIONS|TRACE)$/.test(config.method))) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers['x-csrf-token'] = cookieUtil.get('csrfToken')
      }
  
      function getQueryString (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
      }
      var channel = getQueryString('channel')
      var headers = {
        headers: {
          basicParams: '{"channel":' + channel + ',"token":"' + (cookieUtil.get(channel) ? cookieUtil.get(channel) : '') + '","platform":"' + global.platform + '"}'
        }
      }
      // var headers = {
      //   headers: {
      //     basicParams: '{"channel":20180331160838983010,"token":"72d20441a3ef5c70c3d8ceceefb7b277","platform":"h5"}'
      //   }
      // }
  
      config.headers['basicParams'] = headers.headers.basicParams
      return config
    },
    error => {
      return Promise.reject(error)
    })
// service.interceptors.request.use(config => {
//     config.hearders.post['Content-type'] = 'application/x-www.form-urlencoded';
//     return config;
// }, error => {

//     return Promise.reject(error);
// });

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {


            // switch (error.response.status) {
            //     case 401:
            //       // cookieUtil.set('token', {path:global.webSite})
            //       function getQueryString (name) {
            //         var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            //         var r = window.location.search.substr(1).match(reg)
            //         if (r != null) return unescape(r[2])
            //         return null
            //       }
            //       var channel = getQueryString('channel')
            //       cookieUtil.set(channel, '', {path: global.webSite})
            //       router.push('/login')
            //       return Promise.reject({ code: global.tokenLoseCode })
            //       break// 假定401为约定好的后台session失效的状态吗，页面重新跳转到登陆页清掉cookie缓存
            //     case 500:
            //       break
            //     case 403: // 未登录
            //   }
            return Promise.reject(error);
        } else {
            return Promise.reject('no response');
        }
    }
);

const api = {
    /**
     *
     *
     * @param {string} url 
     * @param {Object} params
     * @param {Object} requestOptions  配置其他参数
     */
    get(url, params, requestOptions) {
        const opts = {
            params: params,
            headers: {
                Accecpt: "*/*"
            },
            paramsSerializer: function (params) {
                return qs.stringify(params);
            }
        }
        return service.get(`${url}`, opts)

    },
    /**
    *
    *
    * @param {string} url 
    * @param {Object} params
    * @param {Object} requestOptions  配置其他参数
    */
    post(url, params, requestOptions) {
        const opts = {};
        return service.post(`${url}`, params, opts);
    }
};