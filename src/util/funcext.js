import './dateformat.js'
/**
 * \转化时间格式
 * 最终格式 hh:mm:ss
 */
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (str) {
    var reg = new RegExp(str + '$')
    return reg.test(this)
  }
}

function accDiv (arg1, arg2) { // 除法
  var t1 = 0,
    t2 = 0
  var r1, r2
  try {
    t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
  }
  try {
    t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  //	console.log("r1="+r1+"r2="+r2+"t2="+t2);
  return parseFloat(((r1 / r2) * Math.pow(10, t2 - t1)).toFixed(4))
}
Number.prototype.div = function (arg) { // 规避除法小数精确值
  return accDiv(this, arg)
}

function accMul (arg1, arg2) { // 乘法
  var t1 = 0,
    t2 = 0,
    r1, r2
  try {
    t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
  }
  try {
    t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
  }
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return parseFloat(((r1 * r2) / Math.pow(10, t2 + t1)).toFixed(4))
}
Number.prototype.mul = function (arg) { // 规避乘法小数精确值
  return accMul(this, arg)
}

function accSubtr (arg1, arg2) { // 减法
  var t1, t2, m, n
  try {
    t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
    t1 = 0
  }
  try {
    t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
    t2 = 0
  }
  m = Math.pow(10, Math.max(t1, t2))
  n = (t1 >= t2) ? t1 : t2
  return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n))
}
Number.prototype.subtr = function (arg) { // 规避减法小数精确值
  return accSubtr(this, arg)
}

function accSum (arg1, arg2) { // 加法
  var t1, t2, m, n
  try {
    t1 = arg1.toString().split('.')[1] ? arg1.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
    t1 = 0
  }
  try {
    t2 = arg2.toString().split('.')[1] ? arg2.toString().split('.')[1].length : 0
  } catch (e) {
    console.log(e)
    t2 = 0
  }
  m = Math.pow(10, Math.max(t1, t2))
  n = (t1 >= t2) ? t1 : t2
  return parseFloat(((arg1 * m + arg2 * m) / m).toFixed(n))
}
Number.prototype.sum = function (arg) { // 规避小数精确值
  return accSum(this, arg)
}
window.timeFormatter = function (value, row, index) {
  value = '' + _trim(value)
  if (value) {
    if (value.length == 5) {
      return '0' + value.substring(0, 1) + ':' + value.substring(1, 3) + ':' + value.substring(3, 5)
    } else if (value.split('.')[0].length > 6) {
      return (new Date(parseInt(value)).Format('hh:mm:ss'))
    } else {
      return value.substring(0, 2) + ':' + value.substring(2, 4) + ':' + value.substring(4, 6)
    }
  } else {
    return ''
  }
}

/**
 * \转化日期格式
 * 最终格式 yyyy-MM-dd
 */
window.dateFormatter = function (value, row, index) {
  value = '' + _trim(value)
  if (value.length > 8) {
    return new Date(parseInt(value)).Format('yyyy-MM-dd') // utc
  } else if (value && value != '0' && value != '19700101') {
    return value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8)
  } else {
    return '-'
  }
}
/**
 * \转化日期格式
 * 最终格式 yyyy-MM-dd
 */
window.datetimeFormatter = function (value, row, index) {
  //	value = _trim(value);
  if (value) {
    return new Date(_trim(value)).Format('yyyy-MM-dd hh:mm:ss')
  }
  //	else if (value)
  //		return value.substring(0,4) + '-' + value.substring(4,6) + '-' + value.substring(6,8);
  else {
    return ''
  }
}
// 根据数字获取小写金额，千分
window.toMoney = function (num) {
  //	if (/^[-]?[0-9]{1,3}(,[0-9]{3})*(\.[0-9]{1,2})?$/.test(num)) {
  //		return num;
  //	}
  //	if (!/^[-]?[0-9]+(\.[0-9]{1,2})?$/.test(num)) {
  //		return '';
  //	}
  if (typeof num === 'undefined' || num === '') return ''
  if (num == '--') return num
  var result = ''
  var int = parseInt(num)
  //	var float = parseInt((parseInt(parseFloat(num) * 1000) - (int * 1000)) / 10);
  var numStr = num.toString()
  var float = numStr.split('.')[1] ? numStr.split('.')[1] : '00'
  var negative = false
  if (int < 0) {
    int = 0 - int
    negative = true
  }
  while (int > 0) {
    var tmp = '' + (int % 1000)
    int = parseInt(int / 1000)
    var len = 3 - tmp.length
    for (var i = 0; i < len; i++) {
      tmp = '0' + tmp
    }
    if (result === '') {
      result = tmp
    } else {
      result = tmp + ',' + result
    }
  }
  result = result.replace(/^0+/, '')
  if (negative) {
    result = '-' + result
  }
  if (float.length === 1) {
    float += '0'
  } else {
    float = float.substr(0, 2)
  }
  if (result == '') result = '0'
  result += '.' + float

  return result
}

function _trim (v) {
  return (v || v === 0) ? (v.trim ? v.trim() : v) : ''
}
window._trim = _trim
/**
 * 身份证号码验证
 *
 * @param value
 * @return
 */
window.idCard = function (value) {
  if (value.length == 18 && value.length != 18) { return false }
  var number = value.toLowerCase()
  var d, sum = 0,
    v = '10x98765432',
    w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7,
      9, 10, 5, 8, 4, 2
    ],
    a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91'
  var re = number
    .match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/)
  if (re == null || a.indexOf(re[1]) < 0) { return false }
  if (re[2].length == 9) {
    number = number.substr(0, 6) + '19' + number.substr(6)
    d = ['19' + re[4], re[5], re[6]].join('-')
  } else { d = [re[9], re[10], re[11]].join('-') }
  // if (!isDateTime.call(d, 'yyyy-MM-dd'))
  // return false;
  for (var i = 0; i < 17; i++) { sum += number.charAt(i) * w[i] }
  return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11))
}
window.browser = {
  versions: (function () {
    var u = navigator.userAgent, app = navigator.appVersion
    //console.log("--------ua---",u)
    return {
      trident: u.indexOf('Trident') > -1, // ie内核
      presto: u.indexOf('Presto') > -1, // opera
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') > -1,
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.match(/\sQQ/i) == ' qq'
    }
  }()),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
