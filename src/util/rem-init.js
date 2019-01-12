function remInit(doc, win, callBack) {
    let docEl = doc.documentElement;
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let recalc = function () {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) {
            return;
        }
        docEl.style.fontSize = 50 * (clientWidth / 750) + 'px';
        callBack && callBack();
    };
    if (!doc.addEventListener) {
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
}
export { remInit };
