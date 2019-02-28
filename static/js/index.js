// host
let host = 'localhost'
// window
let that = this
// 存储组件
let appendCompDat = []
window.onload = function () {
    console.log('hash', window.location.hash)
    // 定义组件方法保存
    this.js = {}
    // 监听 this.data 变化
    proxyDataCallback = (obj, key, value) => { obj[key] = value; return { 'obj': obj, 'key': key, 'value': value } }
    let validator = { 
        set: function(obj, key, value, proxy) { proxyDataCallback(obj, key, value); return Reflect.get(obj, key, value, proxy) }
    }
    let data = new Proxy({}, validator)
    that.data = data

    // 页面加载后跳转此路由
    changeRouter(new handleLocalStorage(['route']).query()['route'] || '/')
    // header 时间 初始值
    headerTimeController()
    // header 时间 计时开始
    setInterval(() => { headerTimeController() }, 1000)
    // 检查登录状态
    checkLoginStatu(1).then((v) => { })

}

console.log(window)

// 选择器
function selectE (elem) { return document.querySelectorAll(elem) }
// 切换路由
function changeRouter (route) { window.location.hash = ''; window.location.hash = route }
// 删除子元素
// 删除指定
function delChildE (elem, target) { elem.removeChild(target) }
function delChildAll (elem) { elem.innerHTML = '' }
function delCompoAll (elem) { if (selectE(elem)[0]) { selectE(elem)[0].parentNode.style.display = 'none'; selectE(elem)[0].parentNode.innerHTML = '' }}
function delAllE (elem) { selectE(elem)[0].parentNode.innerHTML = '' }
// 销毁组件种子所有组件
function destorySeedCompAll () { compSeedAll.forEach((v) => { delChildAll(selectE('#' + v)[0]) }) }
// 元素 display 属性
function displayE (elem, show) { selectE(elem)[0].style.display = show === 1 ? 'block' : 'none'  }
// 刷新页面
function refresh () { window.location.reload() }
// localStorage取token
function getLocalStorageToken (tokenKeyArr) { return new handleLocalStorage(tokenKeyArr).query() }
// localStorage取id
function getLocalStorageId (id) { return new handleLocalStorage([id]).query() }
// 提示信息
function messagePop (txt, time, callback) {
    if (selectE('.comp_popMessage')[0]) { delCompoAll('.comp_popMessage') }
    appendComp(comp_popMessage(txt || '提示'), 'popMessageComp', (compObj, ele) => {
        // 自动关闭
        setTimeout(() => { delCompoAll('.comp_popMessage') }, time || 4000)
        // 回调
        if (typeof callback === 'function') { callback(compObj, ele) || false }
    })
 }
// 获取数组某个相同元素有几个
function getArraySameIte (arr, target) { let n = 0; arr.forEach(ite => { if (ite === target) {  n += 1 } }); return n }

// 获取id为某元素中的id或class为某值的元素列表
function getChildTargetEleListById (elem, idOrClass, target) {
    let child_list = selectE(elem)[0].children
    let arr = []
    let forM = (v) => { for (let i=0; i<child_list.length; i++) { if (child_list[i][v].split(' ')[0] === target) { arr.push(child_list[i][v]) } } }
    if      (idOrClass === 'id')    { forM('id') }
    else if (idOrClass === 'class') { forM('className') }
    else                            { return false }
    return arr
}

// append 加载组件 compo为组件 ele为在哪个html标签内添加组件
function appendComp (comp, ele, callback) {
    // 全局查找有没有ele名称的id 如果有则不再添加
    if (getChildTargetEleListById('#' + ele, 'class', comp['name']).length>0) {
        console.log('已经加载过组件', comp['name'])
        return false
    } else {
        // cid
        let div = document.createElement('div')
        
        // 设置组件外层元素cid class
        div.setAttribute('class', comp['name'])
        div.setAttribute('cid', comp['name'])
        div.className = div.className + ' ' + 'pos_a w_100 h_100'
        selectE('#' + ele)[0].appendChild(div)
        displayE('#' + ele, 1)
        // 将组件添加到外层元素内
        selectE('.' + comp['name'])[0].innerHTML = comp['html']
        that.js[comp['name']] = comp['js']
        that.data[comp['name']] = comp['data']
        console.log('data', that.data)

        // 添加销毁方法
        that.js[comp['name']].destory = (_this_) => { let elem = _this_ ? _this_ : selectE('#' + comp['name'])[0]; elem.parentNode.parentNode.style.display = 'none'; delChildE(elem.parentNode.parentNode, elem.parentNode)}
    }
    // 回调
    if (typeof callback === 'function') { callback(comp, ele) }
}

// header 时间
function headerTimeController () {
    let date = new Date()
    let h    = date.getHours()
    let m    = date.getMinutes(); if (m<10) { m = '0' + m }
    let s    = date.getSeconds(); if (s<10) { s = '0' + s }
    let mm   = date.getMonth() + 1
    let dd   = date.getDate()
    let week = date.getDay()
    let w_t  = ''
    switch (week) { case 0: w_t = '日'; break; case 1: w_t = '一'; break; case 2: w_t = '二'; break; case 3: w_t = '三'; break; case 4: w_t = '四'; break; case 5: w_t = '五'; break; case 6: w_t = '六'; break; default: break }
    selectE('#hederTime')[0].innerHTML = h+':'+m+':'+s+' '+mm+'月'+dd+'日'+' 星期'+w_t
}

// ajax
function ajax (method, url, paramsObj) {
    return new Promise ((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        // 格式化参数
        let params = formatParams(paramsObj)
        function formatParams (paramsObj) {
            let tmp_arr = []
            for (let kv in paramsObj) { tmp_arr.push(encodeURIComponent(kv) + "=" + encodeURIComponent(paramsObj[kv])) }
            return tmp_arr.join('&')
        }
        // 回调
        xhttp.onreadystatechange = callback
        // get
        if (method === 'get' || method === 'GET') {
            xhttp.open('GET', url + '?' + params, true)
            xhttp.send()
        // post
        } else if (method === 'post' || method === 'POST') {
            let token = ''
            try { token = getLocalStorageToken(['token'])['token']['token'] }
            catch { token = '' }
            xhttp.open('POST', url, true)
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhttp.setRequestHeader("token", token)
            xhttp.send(params)
        }
        // 回调定义
        function callback() {
            if (xhttp.readyState == 4) {
                let s = xhttp.status
                if (s>= 200 && s< 300) { let resT = xhttp.responseText; let resX = xhttp.responseXML; resolve({ 'text': resT, 'xml': resX }) } 
                else                   { reject(status)                                                                                      }
            }
        }
    })
}

// 检查登录状态
function checkLoginStatu (mode) {
    return new Promise ((resolve, reject) => {
        let token = null
        try   { token = getLocalStorageToken(['token'])['token']['token'] }
        catch { displayE('#loginButton', 1); displayE('#logoutButton', 0); resolve(false) }
        // 如果已经登录
        if (token) {
            if (mode === 1) {
                // 请求后端验证token
                ajax('post', '/checklogin', {})
                .then((v)  => {
                    let queryRes = JSON.parse(v['text'])
                    if (queryRes.r === 1) { displayE('#loginButton', 0); displayE('#logoutButton', 1); resolve(true) }
                    else { displayE('#loginButton', 1); displayE('#logoutButton', 0); resolve(false) }
                })
                .catch((v) => { console.log('checktoken er', v); resolve(false) })
            } else { resolve(true) }
        // 如果未登录
        } else { displayE('#loginButton', 1); displayE('#logoutButton', 0); resolve(false) }
    })
}

// 操作 localStorage
class handleLocalStorage {
    constructor (params) {
            // { name : { a: 1, b: 2 }}
            // ['it1', 'it2']
            this.params = params
    }
    set () {
        if (this.params.constructor === Object) {
            let obj = this.params
            for (let ite in obj) { localStorage.setItem(ite, JSON.stringify(obj[ite])) }
        }
    }
    query () {
        if (this.params.constructor === Array) {
            let tmp = {}, arr = this.params
            arr.forEach((ite) => { tmp[ite] = JSON.parse(localStorage.getItem(ite)) })
            return tmp
        }
    } 
    clear () { localStorage.clear() }
    delete () { if (this.params.constructor === Array) { this.params.forEach((ite) => { localStorage.removeItem(ite) }) } }

}

// ############### 自定义事件 ########
// 选择forum
function headerSelectForum_change (_this_) {
    let v = _this_['options'][_this_['selectedIndex']]['value']
    if (v) {
        switch (v) {
            case 'Home':     changeRouter('/'); break;
            case 'Electric': changeRouter('/electric'); break;
            default: break
        }
    }
}
// ############### 组件事件 #########
// (1) 注册组件种子
// 组件种子初始化为 none
let compSeedAll = [
    'loginContent',
    'articleList',
    'mainPage_toy',
    'popMessageComp',
]
compSeedAll.forEach((v) => { displayE('#' + v, 0) })


// (2) 编写组件注册的方法
// 登录 显示登录框
function loginShow () { checkLoginStatu().then((v) => {appendComp(comp_loginModal(), 'loginContent') }) }
// 点击logo
function clickLogo () { changeRouter('/') }
// 注销
function logout () { new handleLocalStorage().clear(); checkLoginStatu(0).then((v) => { messagePop('退出账号', '', () => { refresh() }) }) }

// mainPage
// left
function mainPageShow_list () { appendComp(comp_mainPage_list(), 'articleList') }
// right
function mainPageShow_toy () { appendComp(comp_mainPage_toy(), 'mainPage_toy') }