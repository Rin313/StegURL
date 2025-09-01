document.querySelectorAll('button').forEach(b => {if (!b.form) b.type = 'button';});//button的tupe包括submit、reset和button
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
    return s.replace(/^(https?:\/\/)?www\./i, '$1')//.toLowerCase()
    .replace(/youtube\.com\/watch\?v=/g, 'youtu.be/');
};