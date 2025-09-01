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
export const shorten = (s) => {
    return s.replace(/^(https?:\/\/)?www\./i, '$1')
    .replace(/^(https?:\/\/)?m\.(youtube\.com|youtu\.be)/i, '$1$2')
    .replace(/youtube\.com\/watch\?v=/gi, 'youtu.be/')
    .replace(/^(https?:\/\/)?([a-z-]+)\.m\.wikipedia\.org\b/i, '$1$2.wikipedia.org')//要是能访问，就能通过zh.wikipedia.org/api获取id，避免超长的转义路径
};
export function encodeEscapedToBase64url(s){
  // 解析%XX为字节并拼成二进制字符串（btoa需要的是每字节一个字符）
  var i=0,b='';
  for(;i<s.length;i++){
    if(s[i]==='%'){ b+=String.fromCharCode(parseInt(s.slice(i+1,i+3),16)); i+=2; }
    else { b+=s[i]; } // 其他字符按单字节原样并入
  }
  // 标准base64 -> base64url（替换+/，去掉=）
  return btoa(b).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
export function decodeBase64urlToEscaped(u){
  // base64url -> 标准base64，并补齐=到4的倍数
  var s=u.replace(/-/g,'+').replace(/_/g,'/'), m=s.length%4;
  if(m) s+='===='.slice(m);
  // 二进制字符串 -> %XX（大写十六进制）
  var bin=atob(s), out='', i=0, h;
  for(;i<bin.length;i++){
    h=bin.charCodeAt(i).toString(16).toUpperCase();
    out+='%'+(h.length<2?'0'+h:h);
  }
  return out;
}