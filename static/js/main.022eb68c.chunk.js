(this["webpackJsonpinrix-2021-hackathon"]=this["webpackJsonpinrix-2021-hackathon"]||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),c=n(7),s=n.n(c),o=(n(20),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,30)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))}),u=(n(21),n(4)),i=n.n(u),p=n(8),h=n(6),l=n(12),f=n(14),d=n(3);var g=function(e){var t=Object(r.useState)("red"),n=Object(h.a)(t,2),a=n[0],c=n[1];return Object(r.useEffect)((function(){e.speeding&&c("green")}),[e.speeding]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{"data-tip":"","data-for":"registerTip"+e.lat+"/"+e.lng,style:{color:"white",background:a,padding:"15px 10px",display:"inline-flex",textAlign:"center",alignItems:"center",justifyContent:"center",borderRadius:"100%",width:"".concat(.015,"rem"),height:"".concat(.015,"rem"),opacity:.75},children:e.speed}),Object(d.jsx)(f.a,{id:"registerTip"+e.lat+"/"+e.lng,place:"top",effect:"solid",children:"Street: ".concat(e.street,"\nAvg Speed: ").concat(e.avgSpeed)})]})};var j=function(e){var t=Object(r.useState)([]),n=Object(h.a)(t,2),a=n[0],c=n[1],s=Object(r.useState)(1),o=Object(h.a)(s,2),u=o[0],f=o[1];Object(r.useEffect)((function(){function e(){return(e=Object(p.a)(i.a.mark((function e(){var t,n,r,a,s,o,u,p;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new URLSearchParams(window.location.search),n=6,null!==t.get("scale")&&(n=parseInt(t.get("scale"))),r=[],e.next=6,b();case 6:return a=e.sent,e.next=9,O();case 9:for(s=e.sent,o=Y(a[0],a[1],a[2],s[0],s[1],s[2]),u=0;u<o.length-n;u+=n)isNaN(o[u][2][1])||isNaN(o[u][2][0])||isNaN(o[u][3])||(p=o[u][5],o[u][3]<=25&&(p=!0),r.push({lat:o[u][2][1],lng:o[u][2][0],street:o[u][1],speed:o[u][3],speeding:p,avgSpeed:o[u][4]}));console.log(r),c(r);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var j={center:{lat:37.75,lng:-122.45},zoom:11};return Object(d.jsx)("div",{style:{height:"100vh",width:"100%"},children:function(e){return console.log(e),e>12?Object(d.jsx)(l.a,{bootstrapURLKeys:{key:"AIzaSyDIwpNgFSik6tmPDKA2yBsT_nMYXBnA7Tc"},defaultCenter:j.center,defaultZoom:j.zoom,onChange:function(t){f(t.zoom),console.log(e)},children:a.map((function(e){return Object(d.jsx)(g,{lat:e.lat,lng:e.lng,street:e.street,speed:e.speed,speeding:e.speeding,avgSpeed:e.avgSpeed},e.lat+"/"+e.lng)}))}):Object(d.jsx)(l.a,{bootstrapURLKeys:{key:"AIzaSyDIwpNgFSik6tmPDKA2yBsT_nMYXBnA7Tc"},defaultCenter:j.center,defaultZoom:j.zoom,onChange:function(t){f(t.zoom),console.log(e)}})}(u)});function b(){return m.apply(this,arguments)}function m(){return(m=Object(p.a)(i.a.mark((function e(){var t,n,r,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],n=new Headers,e.next=4,x();case 4:return r=e.sent,console.log(r),n.append("Authorization",r),a={method:"GET",headers:n,redirect:"follow"},e.next=10,fetch("https://api.iq.inrix.com/v1/segments/speed?box=37.858%7C-122.541,37.699%7C-122.341",a).then((function(e){return e.text()})).then((function(e){t=N(e)})).catch((function(e){return console.log("error",e)}));case 10:return e.abrupt("return",t);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return v.apply(this,arguments)}function v(){return(v=Object(p.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"f6rmtcl05k","ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm","https://api.iq.inrix.com/auth/v1/appToken?appId=f6rmtcl05k&hashToken=ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm",e.next=5,w("https://api.iq.inrix.com/auth/v1/appToken?appId=f6rmtcl05k&hashToken=ZjZybXRjbDA1a3w2YU55M3Yza2x1YW9LcFVCQWdiT1RzMXZhcFVqSXRYNjBNUVljeThm");case 5:return t=e.sent,n=t.result.token,e.abrupt("return","Bearer "+n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){return y.apply(this,arguments)}function y(){return(y=Object(p.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return k.apply(this,arguments)}function k(){return(k=Object(p.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],n={method:"GET",redirect:"follow"},e.next=4,fetch("https://raw.githubusercontent.com/wiebecoding/inrix-2021-hackathon/main/san_fran_segments.json",n).then((function(e){return e.text()})).then((function(e){t=S(e)})).catch((function(e){return console.log("error",e)}));case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){return T.apply(this,arguments)}function T(){return(T=Object(p.a)(i.a.mark((function e(t){var n,r,a,c,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=[],r=[],a=[],c=JSON.parse(t),s=c.result.segments,console.log(s),o=0;o<s.length;o++)n.push(s[o].code),r.push(s[o].roadInfo.name),a.push(s[o].locationInfo.center.coordinates);return e.abrupt("return",[n,r,a]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){return z.apply(this,arguments)}function z(){return(z=Object(p.a)(i.a.mark((function e(t){var n,r,a,c,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=[],r=[],a=[],c=JSON.parse(t),s=c.result.segmentspeeds[0].segments,o=0;o<s.length;o++)r.push(s[o].speed),a.push(s[o].average),n.push(s[o].code);return e.abrupt("return",[n,r,a]);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(e,t,n,r,a,c){for(var s=[],o=0,u=0;u<e.length;u++)for(var i=0;i<r.length;i++)if(e[u]===r[i]&&null!=a[i]&&null!=c[i]){var p=[];p.push(e[u]),p.push(a[i]),p.push(c[i]),p.push(t[u]),t[u]>o&&(o=t[u]),p.push(n[u]),t[u]>=1.1*n[u]||t[u]>=71.5?(p.push(!0),1):p.push(!1),s.push(p)}return s}},b=n(15),m=n(2);var x=function(e){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(b.a,{basename:"/",children:Object(d.jsx)(m.c,{children:Object(d.jsx)(m.a,{path:"/",exact:!0,element:Object(d.jsx)(j,{})})})})})};s.a.render(Object(d.jsx)(a.a.StrictMode,{children:Object(d.jsx)(x,{})}),document.getElementById("root")),o()}},[[27,1,2]]]);
//# sourceMappingURL=main.022eb68c.chunk.js.map