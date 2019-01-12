function remInit(doc, win, cakkBack) {
    let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc =  function (){
        let clientWidth =docEl.clientWidth;
        if (!clientWidth){
            return ;
        }
        docEl.style.fontSize = 50 * (clientWidth / 750) +'px';
        callBack && callBack();
    };

    if(!doc.addEventListener) {
        return ;
    }
    win.addEventListener(resizeEvent,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
    recalc();
};
export {remInit};