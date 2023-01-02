var r=function(r,t,a){for(var n=(2<<Math.log(t.length-1)/Math.LN2)-1,e=-~(1.6*n*a/t.length),f="";;)for(var h=r(e),o=e;o--;)if((f+=t[h[o]&n]||"").length===+a)return f};export{r as f};
