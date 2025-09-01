export const $ = id => document.getElementById(id);
export function setLang(textMap) {//{"zh-CN":[],"en":[]}这种紧凑的格式维护起来不太灵活，但有利于指示AI翻译//参考RFC 5646
    const supported = Object.keys(textMap);
    const lang = navigator.languages
        .map(nL => supported.find(sL => sL.toLowerCase() === nL.toLowerCase()))
        .find(Boolean)
        || supported[0];
    document.documentElement.lang = lang;//缺少的话不会弹出翻译提示
    return textMap[lang];
}
export const shorten = (s) => {//格式问题由URL对象处理
    return s.replace(/^(https?:\/\/)?www\./i, '$1')
    .replace(/^(https?:\/\/)?m\.(youtube\.com|youtu\.be)/i, '$1$2')
    .replace(/youtube\.com\/watch\?v=/gi, 'youtu.be/');
};