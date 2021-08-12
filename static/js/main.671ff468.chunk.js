(this.webpackJsonpalgorithm_visualizer=this.webpackJsonpalgorithm_visualizer||[]).push([[0],{28:function(e,t,a){},29:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},34:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(20),l=a.n(r),i=(a(28),a(22)),o=a(2),c=a(8),h=(a(29),a(0)),u=function(){return Object(h.jsxs)("div",{className:"landingPage bubbles",children:[Object(h.jsxs)("div",{id:"navigation",children:[Object(h.jsx)("button",{className:"btn",onClick:function(e){return window.location.href+="sorting"},children:"Sorting"}),Object(h.jsx)("button",{className:"btn",onClick:function(e){return window.location.href+="graph"},children:"Graphs"})]}),Object(h.jsxs)("div",{id:"title",children:[Object(h.jsx)("span",{children:Object(h.jsx)("b",{children:"ALGORITHM"})}),Object(h.jsx)("br",{}),Object(h.jsx)("span",{children:Object(h.jsx)("b",{children:"VISUALIZER"})})]}),Object(c.a)(Array(10)).map((function(e,t){return Object(h.jsx)("div",{className:"bubble"},t)}))]})},d=a(4),f=function(e){e=e.slice();var t=[];return function a(n,s,r){if(!(s>r)){var l=function(a,n,s){for(var r=a[s],l=n,i=n;i<s;i++)if(a[i]<r){var o=[a[l],a[i]];a[i]=o[0],a[l]=o[1],t.push([["swap",i,e[i]],["swap",l,e[l]]]),t.push([["clear",i,e[i]],["clear",l,e[l]]]),l++}var c=[a[s],a[l]];return a[l]=c[0],a[s]=c[1],t.push([["swap",s,e[s]],["swap",l,e[l]]]),t.push([["clear",s,e[s]],["clear",l,e[l]]]),l}(n,s,r);t.push([["sorted",l,e[l]]]),a(n,s,l-1),a(n,l+1,r)}}(e,0,e.length-1),t},m=(a(31),"#0dcaf0"),b=50,g=function(){var e=Object(n.useState)(0),t=Object(d.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)({algo:"",best:"",avg:"",worst:""}),l=Object(d.a)(r,2),i=l[0],o=l[1],u=Object(n.useState)(100),g=Object(d.a)(u,2),p=g[0],j=g[1],v=Object(n.useState)(50),O=Object(d.a)(v,2),x=O[0],w=O[1],N=function(){for(var e=setTimeout((function(){})),t=a;t<e;t++)clearTimeout(t);s(e)},y=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=b/e,a=b,n=[],s=(a-t)/(e-1),r=0;r<e;r++)n.push(b/e+s*r);for(var l=n.length-1;l>0;l--){var i=Math.floor(Math.random()*(l+1)),o=n[l];n[l]=n[i],n[i]=o}return n},k=function(){Object(c.a)(document.getElementsByClassName("bar")).forEach((function(e){e.style.backgroundColor=m}))},_=Object(n.useState)(y()),C=Object(d.a)(_,2),M=C[0],S=C[1],z=function(){N(),o({algo:"",best:"",avg:"",worst:""});var e=y();Object(c.a)(document.getElementsByClassName("bar")).forEach((function(t,a){var n=750*a/p;t.style.height="".concat(e[a],"vh"),t.style.backgroundColor=m,t.animate([{height:"0vh"},{opacity:.1,height:"0vh",offset:n/(n+200)},{opacity:1,height:"".concat(e[a],"vh")}],{duration:n+200,iterations:1})})),S(e)};Object(n.useEffect)((function(){z()}),[]);var E=function(e){var t=1e3/p*3*Math.pow(1/3,x/50);N();var a=Array.from(document.getElementsByClassName("bar"));k();for(var n=function(n){setTimeout((function(){for(var t=0;t<e[n].length;t++){var s=Object(d.a)(e[n][t],3),r=s[0],l=s[1],i=s[2],o=a[l].style;-1!==i&&(M[l]=i,o.height="".concat(i,"vh")),"swap"===r&&(o.backgroundColor="#dc3545"),"clear"===r&&(o.backgroundColor=m),"sorted"===r&&(o.backgroundColor="#28a745")}}),n*t)},s=0;s<e.length;s++)n(s)};return Object(h.jsxs)("div",{className:"container sortingPage",children:[Object(h.jsxs)("h1",{className:"title",children:[" ",Object(h.jsx)("a",{href:"/AlgorithmVisualizer/#/",children:Object(h.jsx)("i",{class:"fas fa-arrow-circle-left fa-lg me-3","aria-hidden":"true"})}),"Sorting Algorithms"]}),Object(h.jsx)("div",{className:"bars-container mb-3",style:{height:"".concat(b,"vh")},children:M.map((function(e,t){return Object(h.jsx)("div",{className:"bar",style:{height:"".concat(e,"vh")}},t)}))}),Object(h.jsxs)("div",{className:"row gap-3 mb-3",children:[Object(h.jsxs)("div",{className:"col-md-12 col-lg-9",children:[Object(h.jsxs)("div",{className:"mb-3 gap-2 d-flex justify-content-start flex-wrap",children:[Object(h.jsx)("button",{className:"btn btn-info",onClick:z,children:"Reset"}),Object(h.jsx)("button",{className:"btn btn-outline-light",onClick:function(){o({algo:"Quick Sort",best:"\u03a9(nlogn)",avg:"\u03b8(nlogn)",worst:"O(n^2)"}),E(f(M))},children:"Quick Sort"}),Object(h.jsx)("button",{className:"btn btn-outline-light",onClick:function(){o({algo:"Shell Sort",best:"\u03a9(nlogn)",avg:"\u03b8(nlogn)",worst:"O(n^2)"}),E(function(e){for(var t=[],a=(e=e.slice()).length,n=Math.floor(a/2);n>0;n=Math.floor(n/2))for(var s=n;s<a;s+=1){var r=e[s],l=void 0;for(l=s;l>=n&&e[l-n]>r;l-=n)e[l]=e[l-n],t.push([["swap",l,e[l]],["swap",l-n,e[l-n]]]),1===n?t.push([["sorted",l,e[l]],["sorted",l-n,e[l-n]]]):t.push([["clear",l,e[l]],["clear",l-n,e[l-n]]]);e[l]=r,1===n?t.push([["sorted",l,r]]):t.push([["clear",l,r]])}return t}(M))},children:"Shell Sort"}),Object(h.jsx)("button",{className:"btn btn-outline-light",onClick:function(){o({algo:"Bubble Sort",best:"\u03a9(n)",avg:"\u03b8(n^2)",worst:"O(n^2)"}),E(function(e){var t,a,n=[],s=(e=e.slice()).length;for(t=0;t<s-1;t++)for(a=0;a<s-t-1;a++){if(e[a]>e[a+1]){var r=[e[a+1],e[a]];e[a]=r[0],e[a+1]=r[1],n.push([["swap",a,e[a]],["swap",a+1,e[a+1]]]),n.push([["clear",a,e[a]],["clear",a+1,e[a+1]]])}a+1===s-t-1&&n.push([["sorted",a+1,e[a+1]]])}return n.push([["sorted",0,e[0]]]),n}(M))},children:"Bubble Sort"}),Object(h.jsx)("button",{className:"btn btn-outline-light",onClick:function(){o({algo:"Merge Sort",best:"\u03a9(nlogn)",avg:"\u03b8(nlogn)",worst:"O(nlogn)"}),E(function(e){var t=function(e,t,a,n,s,r){for(var l=t,i=t,o=a+1;i<=a&&o<=n;)s[i]<=s[o]?(e[l]=s[i],r.push([["swap",l,e[l]],["swap",i,-1]]),r.push([["sorted",l,-1],["sorted",i,-1]]),l++,i++):(e[l]=s[o],r.push([["swap",l,e[l]],["swap",o,-1]]),r.push([["sorted",l,-1],["sorted",o,-1]]),l++,o++);for(;i<=a;)e[l]=s[i],r.push([["swap",l,e[l]],["swap",i,-1]]),r.push([["sorted",l,-1],["sorted",i,-1]]),l++,i++;for(;o<=n;)e[l]=s[o],r.push([["swap",l,e[l]],["swap",o,-1]]),r.push([["sorted",l,-1],["sorted",o,-1]]),l++,o++},a=[];if((e=e.slice()).length<=1)return e;var n=e.slice();return function e(a,n,s,r,l){if(n!==s){var i=Math.floor((n+s)/2);e(r,n,i,a,l),e(r,i+1,s,a,l),t(a,n,i,s,r,l)}}(e,0,e.length-1,n,a),a}(M))},children:"Merge Sort"}),Object(h.jsx)("button",{className:"btn btn-outline-light",onClick:function(){o({algo:"Insertion Sort",best:"\u03a9(n)",avg:"\u03b8(n^2)",worst:"O(n^2)"}),E(function(e){e=e.slice();var t,a,n=[];for(n.push([["sorted",0,e[0]]]),t=1;t<e.length;t++){for(a=t;a>=0&&e[a]<e[a-1];){var s=[e[a-1],e[a]];e[a]=s[0],e[a-1]=s[1],n.push([["swap",a,e[a]],["swap",a-1,e[a-1]]]),n.push([["sorted",a,e[a]],["sorted",a-1,e[a-1]]]),a-=1}n.push([["sorted",a,e[a]]])}return n}(M))},children:"Insertion Sort"})]}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-sm-12 col-md-6",children:[Object(h.jsxs)("label",{className:"form-label",children:[" Number of Bars : ",p," "]}),Object(h.jsx)("input",{type:"range",step:"1",min:"5",max:"500",defaultValue:p,className:"form-range",onMouseDown:function(){N(),k()},onChange:function(e){j(e.target.value),S(y(e.target.value))}})]}),Object(h.jsxs)("div",{className:"col-sm-12 col-md-6",children:[Object(h.jsxs)("label",{className:"form-label",children:[" Animation Speed : ",x,"% "]}),Object(h.jsx)("input",{type:"range",step:"1",min:"1",max:"100",defaultValue:x,className:"form-range",onMouseDown:function(){N(),k()},onChange:function(e){w(e.target.value)}})]})]})]}),Object(h.jsx)("div",{className:"col",children:Object(h.jsx)("table",{className:"table table-sm table-borderless text-white w-auto mb-0",children:Object(h.jsxs)("tbody",{children:[Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"pe-3 pt-0",scope:"row",children:"Algorithm"}),Object(h.jsx)("td",{className:"pt-0",children:i.algo})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"pe-3 pt-0",scope:"row",children:"Best"}),Object(h.jsx)("td",{className:"pt-0",children:i.best})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"pe-3 pt-0",scope:"row",children:"Average"}),Object(h.jsx)("td",{className:"pt-0",children:i.avg})]}),Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{className:"pe-3 pt-0",scope:"row",children:"Worst"}),Object(h.jsx)("td",{className:"pt-0",children:i.worst})]})]})})})]})]})},p=(a(32),a(13)),j=a(14),v=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e,t){return e>t};Object(p.a)(this,e),this._heap=[],this._comparator=t,this.top=0}return Object(j.a)(e,[{key:"parent",value:function(e){return(e+1>>>1)-1}},{key:"left",value:function(e){return 1+(e<<1)}},{key:"right",value:function(e){return e+1<<1}},{key:"size",value:function(){return this._heap.length}},{key:"isEmpty",value:function(){return 0===this.size()}},{key:"peek",value:function(){return this._heap[this.top]}},{key:"push",value:function(){for(var e=this,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return a.forEach((function(t){e._heap.push(t),e._siftUp()})),this.size()}},{key:"pop",value:function(){var e=this.peek(),t=this.size()-1;return t>this.top&&this._swap(this.top,t),this._heap.pop(),this._siftDown(),e}},{key:"replace",value:function(e){var t=this.peek();return this._heap[this.top]=e,this._siftDown(),t}},{key:"_greater",value:function(e,t){return this._comparator(this._heap[e],this._heap[t])}},{key:"_swap",value:function(e,t){var a=[this._heap[t],this._heap[e]];this._heap[e]=a[0],this._heap[t]=a[1]}},{key:"_siftUp",value:function(){for(var e=this.size()-1;e>this.top&&this._greater(e,this.parent(e));)this._swap(e,this.parent(e)),e=this.parent(e)}},{key:"_siftDown",value:function(){for(var e=this.top;this.left(e)<this.size()&&this._greater(this.left(e),e)||this.right(e)<this.size()&&this._greater(this.right(e),e);){var t=this.right(e)<this.size()&&this._greater(this.right(e),this.left(e))?this.right(e):this.left(e);this._swap(e,t),e=t}}}]),e}(),O=function(){function e(){Object(p.a)(this,e),this._queue=[],this._offset=0}return Object(j.a)(e,[{key:"getLength",value:function(){return this._queue.length-this._offset}},{key:"isEmpty",value:function(){return 0===this._queue.length}},{key:"enqueue",value:function(e){this._queue.push(e)}},{key:"dequeue",value:function(){if(0!==this._queue.length){var e=this._queue[this._offset];return 2*++this._offset>=this._queue.length&&(this._queue=this._queue.slice(this._offset),this._offset=0),e}}},{key:"peek",value:function(){return this._queue.length>0?this._queue[this._offset]:void 0}}]),e}();function x(e,t,a){var n=[],s=new v((function(e,t){return e.dv<t.dv}));for(t.dv=0,s.push(t);!s.isEmpty();){var r=s.pop();if(!r.known){r.known=!0,n.push(r);var l=[],i=r.row,o=r.col;i>0&&l.push(e[i-1][o]),i<e.length-1&&l.push(e[i+1][o]),o>0&&l.push(e[i][o-1]),o<e[0].length-1&&l.push(e[i][o+1]);for(var c=0,h=l;c<h.length;c++){var u=h[c],d=u.ref.className,f=1;if(d.startsWith("node-weight-")&&(f=parseInt(d.split("-")[2])),!u.known&&"node-wall"!==d&&u.dv>r.dv+f){if(u.dv=r.dv+f,u.pv=r,u===a)return n.shift(),n;s.push(u)}}}}return n.shift(),n}function w(e,t,a,n){var s=[],r=[],l=[];for(t.f=0,t.g=0,t.h=0,r.push(t);0!==r.length;){r.sort((function(e,t){return e.f-t.f}));var i=r.shift();if(l.push(i),i===a)return s.shift(),s;s.push(i);var o=[],c=i.row,h=i.col;c>0&&o.push(e[c-1][h]),c<e.length-1&&o.push(e[c+1][h]),h>0&&o.push(e[c][h-1]),h<e[0].length-1&&o.push(e[c][h+1]);for(var u=0,d=o;u<d.length;u++){var f=d[u],m=f.ref.className;if("node-wall"!==m&&!l.includes(f)){var b=[f.row,f.col],g=b[0],p=b[1],j=[a.row,a.col],v=j[0],O=j[1],x=Math.abs(v-g),w=Math.abs(O-p),N=0;if("Manhattan"===n)N=x+w;else if("Diagonal"===n)N=x+w-.58578644*Math.min(x,w);else{if("Euclidean"!==n)throw"Invalid A* Distance Type";N=Math.hypot(x,w)}var y=1;m.startsWith("node-weight-")&&(y=parseInt(m.split("-")[2]));var k=i.g+y,_=N,C=k+_;(C<f.f||!r.includes(f))&&(f.f=C,f.g=k,f.h=_,f.pv=i,r.includes(f)||r.push(f))}}}return s.shift(),s}function N(e,t,a){return w(e,t,a,"Manhattan")}function y(e,t,a){return w(e,t,a,"Diagonal")}function k(e,t,a){return w(e,t,a,"Euclidean")}function _(e,t,a){var n=[],s=new O;for(t.known=!0,s.enqueue(t);!s.isEmpty();){var r=s.dequeue();n.push(r);var l=[],i=r.row,o=r.col;i>0&&l.push(e[i-1][o]),i<e.length-1&&l.push(e[i+1][o]),o>0&&l.push(e[i][o-1]),o<e[0].length-1&&l.push(e[i][o+1]);for(var c=0,h=l;c<h.length;c++){var u=h[c];if(!u.known&&"node-wall"!==u.ref.className){if(u.pv=r,u.known=!0,u===a)return n.shift(),n;s.enqueue(u)}}}return n.shift(),n}function C(e,t,a){var n=[],s=[];for(s.push(t);s.length>0;){var r=s.pop();if(r===a)return n.shift(),n;r.known||n.push(r),r.known=!0;var l=[],i=r.row,o=r.col;i>0&&l.push(e[i-1][o]),o>0&&l.push(e[i][o-1]),o<e[0].length-1&&l.push(e[i][o+1]),i<e.length-1&&l.push(e[i+1][o]);for(var c=0,h=l;c<h.length;c++){var u=h[c];u.known||"node-wall"===u.ref.className||(u.pv=r,s.push(u))}}return n.shift(),n}function M(e){var t=[],a=e.pv;if(!a)return[];for(;null!==a.pv;)t.unshift(a),a=a.pv;return t}var S=function(e,t){var a;do{a=Math.floor(Math.random()*(t-e+1)+e)}while(a%2!==0);return a},z=function(e,t){var a;do{a=Math.floor(Math.random()*(t-e+1)+e)}while(a%2===0);return a},E=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},A=function(e,t,a,n,s){return(e-t)*(s-n)/(a-t)+n};function T(e){for(var t=[],a=0;a<e.length;a++)t.push([a,0]),t.push([e.length-a-1,e[0].length-1]);for(var n=0;n<e[0].length;n++)t.push([0,e[0].length-n-1]),t.push([e.length-1,n]);return function e(a,n,s,r,l){if(!(r-n<3||l-s<3)){var i=Math.random()<(l-s)/(r-n+(l-s)),o=i?S(s+1,l-1):S(n+1,r-1),c=i?z(n+1,r-1):z(s+1,l-1);if(i){for(var h=n+1;h<r;h++)h!==c&&t.push([o,h]);e(a,n,s,r,o),e(a,n,o,r,l)}else{for(var u=s+1;u<l;u++)u!==c&&t.push([u,o]);e(a,n,s,o,l),e(a,o,s,r,l)}}}(e,0,0,e[0].length-1,e.length-1),t}function D(e){for(var t=[],a=0;a<e.length;a++)for(var n=0;n<e[0].length;n++)Math.random()<.3&&t.push([a,n]);return t}function L(e){for(var t=[],a=0;a<e.length;a++)for(var n=0;n<e[0].length;n++)t.push([a,n,E(2,30)]);return t}function W(e){for(var t=[],a=[],n=[],s=0;s<e.length;s++){for(var r=[],l=0;l<e[0].length;l++)r.push(!0);n.push(r)}var i=[],o=[z(1,n.length-2),z(1,n[0].length-2)],c=o[0],h=o[1];for(i.push([c,h,c,h]);i.length>0;){var u=E(0,i.length-1),f=i[u];i.splice(u,1);var m=f[2],b=f[3];!0===n[m][b]&&(n[m][b]=!1,n[f[0]][f[1]]=!1,a.push([m,b]),m>1&&!0===n[m-2][b]&&i.push([m-1,b,m-2,b]),m<n.length-2&&!0===n[m+2][b]&&i.push([m+1,b,m+2,b]),b>1&&!0===n[m][b-2]&&i.push([m,b-1,m,b-2]),b<n[0].length-2&&!0===n[m][b+2]&&i.push([m,b+1,m,b+2]))}for(var g=0,p=a;g<p.length;g++)for(var j=p[g],v=Object(d.a)(j,2),O=v[0],x=v[1],w=0,N=[[O-1,x-1],[O-1,x],[O-1,x+1],[O,x+1],[O+1,x+1],[O+1,x],[O+1,x-1],[O,x-1]];w<N.length;w++){var y=N[w];y[0]>=0&&y[0]<e.length&&y[1]>=0&&y[1]<e[0].length&&n[y[0]][y[1]]&&(t.push(y),n[y[0]][y[1]]=!1)}return t}function R(e){for(var t=[],a=[],n=[],s=0;s<e.length;s++){for(var r=[],l=0;l<e[0].length;l++)r.push(!0);n.push(r)}var i=[],o=[z(1,n.length-2),z(1,n[0].length-2)],c=o[0],h=o[1];for(i.push([c,h,c,h]);i.length>0;){var u=i.pop(),f=u[2],m=u[3];if(n[f][m]){n[f][m]=!1,n[u[0]][u[1]]=!1,a.push([f,m]);var b=[];if(f>1&&!0===n[f-2][m]&&b.push([f-1,m,f-2,m]),f<n.length-2&&!0===n[f+2][m]&&b.push([f+1,m,f+2,m]),m>1&&!0===n[f][m-2]&&b.push([f,m-1,f,m-2]),m<n[0].length-2&&!0===n[f][m+2]&&b.push([f,m+1,f,m+2]),b.length>0){for(var g=E(0,b.length-1),p=0;p<b.length;p++)p!==g&&i.splice(E(0,i.length),0,b[p]);i.push(b[g])}}}for(var j=0,v=a;j<v.length;j++)for(var O=v[j],x=Object(d.a)(O,2),w=x[0],N=x[1],y=0,k=[[w-1,N-1],[w-1,N],[w-1,N+1],[w,N+1],[w+1,N+1],[w+1,N],[w+1,N-1],[w,N-1]];y<k.length;y++){var _=k[y];_[0]>=0&&_[0]<e.length&&_[1]>=0&&_[1]<e[0].length&&n[_[0]][_[1]]&&(t.push(_),n[_[0]][_[1]]=!1)}return t}function q(e){for(var t=[],a=[],n=[],s=0;s<e.length;s++){for(var r=[],l=0;l<e[0].length;l++)r.push(!0);n.push(r)}for(var i=1;i<e.length;i+=2)for(var o=1;o<e[0].length;o+=2){n[i][o]=!1,a.push([i,o]);var c=[];if(i>1&&c.push([i-1,o]),o>1&&c.push([i,o-1]),c.length>0){var h=c[E(0,c.length-1)];n[h[0]][h[1]]=!1}}for(var u=0,f=a;u<f.length;u++)for(var m=f[u],b=Object(d.a)(m,2),g=b[0],p=b[1],j=0,v=[[g-1,p-1],[g-1,p],[g-1,p+1],[g,p+1],[g+1,p+1],[g+1,p],[g+1,p-1],[g,p-1]];j<v.length;j++){var O=v[j];O[0]>=0&&O[0]<e.length&&O[1]>=0&&O[1]<e[0].length&&n[O[0]][O[1]]&&(t.push(O),n[O[0]][O[1]]=!1)}return t}var I=a(33);function B(e){for(var t,a,n,s=[],r=new I(Math.random),l=0;l<e.length;l++)for(var i=0;i<e[0].length;i++)s.push([l,i,Math.floor(A((t=r.noise2D(.075*l,.075*i),a=-.6,n=.6,t<a&&(t=a),t>n&&(t=n),t),-.6,.6,2,30))]);return s}function F(e,t){return new Promise((function(a,n){t||n("invalid reader"),t.onload=function(t){var n=document.createElement("img");n.src=t.target.result,n.onload=function(t){var n=document.createElement("canvas");n.width=e[0].length,n.height=e.length;var s=n.getContext("2d");s.drawImage(t.target,0,0,n.width,n.height);for(var r=s.getImageData(0,0,s.canvas.width,s.canvas.height).data,l=[],i=0;i<r.length;i+=4){var o=parseInt((r[i]+r[i+1]+r[i+2])/3);l.push(Math.round(A(o,0,255,2,30)))}for(var c=[],h=0,u=0;u<e.length;u++)for(var d=0;d<e[0].length;d++)c.push([u,d,l[h++]]);a(c)}}}))}a(34);var P,V,U,G=Object(n.forwardRef)((function(e,t){var a=e.row,n=e.col,s=e.type;return Object(h.jsx)("div",{className:"wrapper",children:Object(h.jsx)("div",{ref:t,id:"node-".concat(a,"-").concat(n),className:s,children:Object(h.jsx)("div",{})})})})),H=a(21),J=a.n(H),Q=a.p+"static/media/tutorial_page_1.5de78eab.gif",Y=a.p+"static/media/tutorial_page_2.a22faa6b.gif",Z=a.p+"static/media/tutorial_page_3.58e0ed19.gif",K=a.p+"static/media/tutorial_page_4.0eed5ae8.gif",X=1.6,$=0,ee=-1,te=null,ae=null,ne=null,se=null,re=null,le="node-wall",ie=50,oe=function(e){return Math.floor(e/parseFloat(getComputedStyle(document.documentElement).fontSize)/X)},ce=function(){var e=Object(n.useRef)([]).current,t=Object(n.useRef)(),a=Object(n.useState)(null),s=Object(d.a)(a,2),r=s[0],l=s[1],i=Object(n.useRef)(),o=Object(n.useRef)(),u=Object(n.useState)(!1),f=Object(d.a)(u,2),m=f[0],b=f[1],g=Object(n.useState)(1),p=Object(d.a)(g,2),j=p[0],v=p[1];Object(n.useEffect)((function(){return requestAnimationFrame((function(){P=2,V=2,U=e.length-3,te=e[0].length-3,A()})),H(),window.addEventListener("resize",H),document.addEventListener("mousedown",O),document.addEventListener("mousemove",w),document.addEventListener("mouseup",S),t.current.addEventListener("contextmenu",(function(e){return e.preventDefault()})),function(){window.removeEventListener("resize",H),document.removeEventListener("mousedown",O),document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",S),t.current.removeEventListener("contextmenu",(function(e){return e.preventDefault()}))}}),[]);var O=function(t){if(ee=t.button,t.target.parentNode.id){var a=t.target.parentNode.id.split("-"),n=Object(d.a)(a,3),s=n[0],r=n[1],l=n[2];if("node"===s){var i=e[r][l];if(0===ee)if("node-start"===i.ref.className)ae="node-start";else if("node-end"===i.ref.className)ae="node-end";else{if(i.ref.className===le)return;i.ref.className=le,re?z(null,!0):ce(i.ref,100)}else 2===ee&&("node-wall"===i.ref.className||i.ref.className.startsWith("node-weight-"))&&(i.ref.className="node-empty",re&&z(null,!0))}}},w=function(t){if(-1!==ee&&t.target.parentNode.id){var a=t.target.parentNode.id.split("-"),n=Object(d.a)(a,3),s=n[0],r=n[1],l=n[2];if("node"===s){var i=e[r][l];if(0===ee){if("node-start"===i.ref.className)return;if("node-end"===i.ref.className)return;if("node-start"===ae){var o=e[P][V];ne&&("node-wall"===ne||ne.startsWith("node-weight-"))?o.ref.className=ne:o.ref.className="node-empty",ne=i.ref.className,i.ref.className="node-start",P=r,V=l,re?z(null,!0):ce(i.ref,50,[{transform:"scale(.75)"},{transform:"scale(1)"}])}else if("node-end"===ae){var c=e[U][te];se&&("node-wall"===se||se.startsWith("node-weight-"))?c.ref.className=se:c.ref.className="node-empty",se=i.ref.className,i.ref.className="node-end",U=r,te=l,re?z(null,!0):ce(i.ref,50,[{transform:"scale(.75)"},{transform:"scale(1)"}])}else i.ref.className!==le&&(i.ref.className=le,re?z(null,!0):ce(i.ref,100))}else 2===ee&&("node-wall"===i.ref.className||i.ref.className.startsWith("node-weight-"))&&(i.ref.className="node-empty",re&&z(null,!0))}}},S=function(){ee=-1,ae=null},z=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];I(),t&&(re=t);var n=re(e,e[P][V],e[U][te]),s=M(e[U][te]);if(a){for(var l=0;l<n.length;l++)n[l].ref.childNodes[0].className="node-visited";for(var i=0;i<s.length;i++)s[i].ref.childNodes[0].className="node-shortest-path"}else!function(){for(var e=1e4/(r.rows*r.cols)*5*Math.pow(.2,ie/50),t=e>3?1:Math.ceil(3/e),a=t<2&&X>1,l=function(s){setTimeout((function(){for(var e=s;e<s+t&&e<n.length;e++){var r=n[e].ref.childNodes[0];r.className="node-visited",a&&ce(r,200,[{transform:"scale(0)",borderRadius:"100%"},{transform:"scale(1)",borderRadius:0}])}}),e*s)},i=0;i<n.length;i+=t)l(i);var o=5*e<15?15:5*e>50?50:5*e;setTimeout((function(){for(var e=function(e){setTimeout((function(){var t=s[e].ref.childNodes[0];t.className="node-shortest-path",a&&ce(t,200)}),o*e)},t=0;t<s.length;t++)e(t)}),e*n.length)}()},E=function(t){A();for(var a=t(e),n=3e3/a.length,s=n>2?1:Math.ceil(2/n),r=function(t){setTimeout((function(){for(var n=t;n<t+s&&n<a.length;n++){var r=e[a[n][0]][a[n][1]],l=null;3===a[n].length&&(l=a[n][2]),"node-start"!==r.ref.className&&"node-end"!==r.ref.className&&(r.ref.className=l?"node-weight-".concat(l):"node-wall")}}),n*t)},l=0;l<a.length;l+=s)r(l)},A=function(){ne=null,se=null,re=null,ue();for(var t=0;t<e.length;t++)for(var a=0;a<e[0].length;a++){var n=e[t][a];U===t&&te===a||P===t&&V===a||(n.ref.className="node-empty"),n.ref.childNodes[0].className="node-empty",he(n)}e[U][te].ref.className="node-end",e[P][V].ref.className="node-start"},I=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&(re=null),ue();for(var a=0;a<e.length;a++)for(var n=0;n<e[0].length;n++){var s=e[a][n];s.ref.childNodes[0].className="node-empty",he(s)}},H=function(){ue();var a=oe(t.current.offsetHeight),n=oe(t.current.offsetWidth);a>1&&a%2===0&&a--,n>1&&n%2===0&&n--,l({rows:a,cols:n}),P&&V&&U&&te&&(P>a-1&&(P=a-1),V>n-1&&(V=n-1),U>a-1&&(U=a-1),te>n-1&&(te=n-1),P===U&&V===te&&(V-=1),e[U][te].ref.className="node-end",e[P][V].ref.className="node-start"),re&&z(null,!0)},ce=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[{transform:"scale(0)"},{transform:"scale(1)"}];e.animate(a,{duration:t,iterations:1})},he=function(e){e.dv=1/0,e.known=!1,e.pv=null,e.g=1/0,e.h=1/0,e.f=1/0},ue=function(){for(var e=setTimeout((function(){})),t=$;t<e;t++)clearTimeout(t);$=e};return Object(h.jsxs)("div",{className:"graphPage",children:[Object(h.jsxs)("div",{className:"sidebar d-flex flex-column bg-black",children:[Object(h.jsxs)("h5",{className:"pb-3 mb-3 border-bottom",children:[Object(h.jsx)("a",{href:"/AlgorithmVisualizer/#/",children:Object(h.jsx)("i",{className:"fas fa-arrow-circle-left fa-lg me-3"})}),"Graph Algorithms"]}),Object(h.jsxs)("div",{className:"mb-3 gap-2 d-flex flex-row justify-content-start flex-wrap",children:[Object(h.jsx)("button",{className:"btn btn-sm btn-warning",onClick:A,children:"Reset Board"}),Object(h.jsx)("button",{className:"btn btn-sm btn-info",onClick:function(){I(!0)},children:"Clear Visualization"})]}),Object(h.jsx)("div",{className:"scrollarea flex-grow-1",children:Object(h.jsxs)("ul",{className:"list-unstyled mb-0 ps-0 bg-dark rounded",children:[Object(h.jsxs)("li",{children:[Object(h.jsx)("button",{className:"btn btn-toggle align-items-center rounded mb-1","data-bs-toggle":"collapse","data-bs-target":"#home-collapse","aria-expanded":"false",children:"Unweighted Pathfinding"}),Object(h.jsx)("div",{className:"collapse",id:"home-collapse",children:Object(h.jsxs)("ul",{className:"btn-toggle-nav list-unstyled fw-normal pb-1 small",children:[Object(h.jsxs)("li",{onClick:function(){z(_)},children:[Object(h.jsx)("i",{className:"fas fa-search-location fa-sm"}),"Breadth First Search"]}),Object(h.jsxs)("li",{onClick:function(){z(C)},children:[Object(h.jsx)("i",{className:"fas fa-layer-group fa-sm"}),"Depth First Search"]})]})})]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("button",{className:"btn btn-toggle align-items-center rounded mb-1","data-bs-toggle":"collapse","data-bs-target":"#dashboard-collapse","aria-expanded":"false",children:"Weighted Pathfinding"}),Object(h.jsx)("div",{className:"collapse",id:"dashboard-collapse",children:Object(h.jsxs)("ul",{className:"btn-toggle-nav list-unstyled fw-normal pb-1 small",children:[Object(h.jsxs)("li",{onClick:function(){z(x)},children:[Object(h.jsx)("i",{className:"fas fa-project-diagram fa-sm"}),"Dijkstra"]}),Object(h.jsxs)("li",{onClick:function(){z(N)},children:[Object(h.jsx)("i",{className:"far fa-star fa-sm"}),"A* (Manhattan)"]}),Object(h.jsxs)("li",{onClick:function(){z(y)},children:[Object(h.jsx)("i",{className:"far fa-star fa-sm"}),"A* (Diagonal)"]}),Object(h.jsxs)("li",{onClick:function(){z(k)},children:[Object(h.jsx)("i",{className:"far fa-star fa-sm"}),"A* (Euclidean)"]})]})})]}),Object(h.jsxs)("li",{children:[Object(h.jsx)("button",{className:"btn btn-toggle align-items-center rounded mb-1","data-bs-toggle":"collapse","data-bs-target":"#orders-collapse","aria-expanded":"false",children:"Mazes"}),Object(h.jsx)("div",{className:"collapse",id:"orders-collapse",children:Object(h.jsxs)("ul",{className:"btn-toggle-nav list-unstyled fw-normal pb-1 small",children:[Object(h.jsxs)("li",{onClick:function(){E(T)},children:[Object(h.jsx)("i",{className:"fas fa-sync-alt fa-sm"}),"Recursive Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(W)},children:[Object(h.jsx)("i",{className:"fab fa-pagelines fa-sm"}),"Prims Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(R)},children:[Object(h.jsx)("i",{className:"fas fa-layer-group fa-sm"}),"DFS Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(q)},children:[Object(h.jsx)("i",{className:"fas fa-code-branch fa-sm"}),"Binary Tree Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(D)},children:[Object(h.jsx)("i",{className:"fas fa-random fa-sm"}),"Random Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(L)},children:[Object(h.jsx)("i",{className:"fas fa-weight-hanging fa-sm"}),"Random Weighted Maze"]}),Object(h.jsxs)("li",{onClick:function(){E(B)},children:[Object(h.jsx)("i",{className:"fas fa-mountain fa-sm"}),"Natural Terrain"]}),Object(h.jsx)("label",{className:"w-100",children:Object(h.jsxs)("li",{children:[Object(h.jsx)("input",{type:"file",onChange:function(t){F(e,function(e){var t=e.target.files[0];if(!t)return null;e.target.value="";var a=new FileReader;return a.readAsDataURL(t),a}(t)).then((function(e){return E((function(){return e}))})).catch((function(e){console.log(e)}))},accept:".jpg, .jpeg, .png"}),Object(h.jsx)("i",{className:"far fa-image fa-sm"}),"Image Terrain"]})}),Object(h.jsxs)("li",{type:"button","data-bs-toggle":"modal","data-bs-target":"#modal",onClick:function(){b(!0)},children:[Object(h.jsx)("i",{className:"fas fa-camera fa-sm"}),"Webcam Terrain"]})]})})]})]})}),Object(h.jsx)("button",{className:"btn btn-toggle align-items-center rounded my-1","data-bs-toggle":"collapse","data-bs-target":"#settings-collapse","aria-expanded":"true",children:"Options"}),Object(h.jsxs)("div",{className:"collapse show settings-menu",id:"settings-collapse",children:[Object(h.jsxs)("div",{className:"mb-1 gap-2 d-flex justify-content-start align-items-center flex-wrap",children:[Object(h.jsx)("label",{className:"form-label m-0",children:" Set Wall Weight : "}),Object(h.jsx)("div",{ref:i,id:"example-weight",className:"node-wall"})]}),Object(h.jsx)("input",{type:"range",step:"1",min:"2",max:"31",defaultValue:31,className:"form-range",onChange:function(e){var t=parseInt(e.target.value);31===t?le="node-wall":(t>=2||t<=30)&&(le="node-weight-".concat(Math.floor(t))),i.current.className=le}}),Object(h.jsx)("label",{className:"form-label d-block mb-1",children:" Set Grid Size : "}),Object(h.jsx)("input",{type:"range",step:".2",min:".6",max:"3.2",defaultValue:X,className:"form-range",onChange:function(e){X=e.target.value,H()}}),Object(h.jsx)("label",{className:"form-label d-block mb-1",children:"Animation Speed : "}),Object(h.jsx)("input",{type:"range",step:"1",min:"1",max:"100",defaultValue:50,className:"form-range",onChange:function(e){I(!0),ie=parseInt(e.target.value)}})]}),Object(h.jsx)("li",{type:"button","data-bs-toggle":"modal","data-bs-target":"#tutorial",onClick:function(){v(1)},children:"Tutorial"})]}),(e.length=0,Object(h.jsx)("div",{className:"grid d-flex flex-column flex-grow-1",ref:t,children:r&&Object(c.a)(Array(r.rows)).map((function(t,a){var n=[],s=Object(h.jsx)("div",{className:"grid-row d-flex flex-row",children:Object(c.a)(Array(r.cols)).map((function(e,t){return Object(h.jsx)(G,{ref:function(e){return n.push({ref:e,row:a,col:t,g:1/0,h:1/0,f:1/0,dv:1/0,known:!1,pv:null})},row:a,col:t,type:"node-empty"},t)}))},a);return e.push(n),s}))})),Object(h.jsx)("div",{className:"modal fade",id:"modal",tabindex:"-1","aria-labelledby":"modal-label","aria-hidden":"true",children:Object(h.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:Object(h.jsxs)("div",{className:"modal-content camera-modal",children:[Object(h.jsxs)("div",{className:"modal-header",children:[Object(h.jsx)("h5",{className:"modal-title text-white",id:"modal-label",children:"Webcam Terrain Generator"}),Object(h.jsx)("button",{type:"button",className:"btn-close btn-close-white","data-bs-dismiss":"modal","aria-label":"Close",onClick:function(){b(!1)}})]}),Object(h.jsx)("div",{className:"modal-body p-0",children:m&&Object(h.jsx)(J.a,{className:"w-100",ref:o,screenshotFormat:"image/jpeg",audio:!1})}),Object(h.jsx)("div",{className:"modal-footer",children:Object(h.jsx)("button",{className:"btn btn-outline-light","data-bs-dismiss":"modal",onClick:function(t){F(e,function(){var e=o.current.getScreenshot();if(!e)return null;var t=function(e){for(var t=e.split(","),a=t[0].match(/:(.*?);/)[1],n=atob(t[1]),s=n.length,r=new Uint8Array(s);s--;)r[s]=n.charCodeAt(s);return new Blob([r],{type:a})}(e),a=new FileReader;return a.readAsDataURL(t),a}()).then((function(e){return E((function(){return e}))})).catch((function(e){console.log(e)})),b(!1)},children:"Capture Image"})})]})})}),Object(h.jsx)("div",{className:"modal show fade",id:"tutorial",tabindex:"-1","aria-labelledby":"myLargeModalLabel","aria-hidden":"true",children:Object(h.jsx)("div",{className:"modal-dialog modal-dialog-centered modal-lg",children:Object(h.jsxs)("div",{className:"modal-content camera-modal",children:[Object(h.jsx)("div",{className:"modal-header",children:Object(h.jsx)("h5",{className:"col-12 modal-title text-white",id:"modal-label",children:Object(h.jsxs)("b",{children:["Tutorial - ",1==j?"Graph Algorithms":2==j?"Weighted/Unweighted":3==j?"Mazes/Terrain":"Options"]})})}),Object(h.jsxs)("div",{className:"modal-body p-0",children:[1==j?Object(h.jsx)("p",{children:"Pathfinding is closely related to the shortest path problem, within graph theory, which examines how to identify the path that best meets some criteria (shortest, cheapest, fastest, etc) between two points in a large network. This site is a tool to visualize these different graph pathfinding algorithms to better understand them."}):2==j?Object(h.jsx)("p",{children:'All of the algorithms on this application are adapted for a 2D grid, movement through a node has a "cost" of 1. Different weights can be added by utilizing the Wall Weight Slider under the options menu. Weighted algorithms will take into consideration of these different weights on the grid whereas unweighted algorithms will ignore them entirely.'}):3==j?Object(h.jsx)("p",{children:"You can generate a maze using the algorithms within the maze dropdown. Weighted mazes are referred to as terrains. These can be created via image upload, webcam picture, or created within the application."}):Object(h.jsx)("p",{children:"The option menu allows the user to adapt the grid to their liking. This includes features such as setting wall weights, adjusting the grid size, and changing the animation speed."}),1==j?Object(h.jsx)("img",{src:Q,alt:"loading..."}):2==j?Object(h.jsx)("img",{src:Y,alt:"loading..."}):3==j?Object(h.jsx)("img",{src:Z,alt:"loading..."}):Object(h.jsx)("img",{src:K,alt:"loading..."})]}),Object(h.jsxs)("div",{className:"modal-footer",children:[1==j?Object(h.jsx)("button",{className:"btn btn-outline-light",id:"skip-button","data-bs-dismiss":"modal",children:"Skip"}):"",j>1?Object(h.jsx)("button",{className:"btn btn-outline-light",id:"skip-button",onClick:function(){return v((function(e){return e-1}))},children:"Previous"}):"",j<4?Object(h.jsx)("button",{className:"btn btn-outline-light",id:"skip-button",onClick:function(){return v((function(e){return e+1}))},children:"Next"}):"",4==j?Object(h.jsx)("button",{className:"btn btn-outline-light",id:"skip-button","data-bs-dismiss":"modal",children:"Finish"}):""]})]})})})]})},he=function(){return Object(h.jsx)(i.a,{children:Object(h.jsxs)(o.c,{children:[Object(h.jsx)(o.a,{exact:!0,path:"/",component:u}),Object(h.jsx)(o.a,{path:"/sorting",component:g}),Object(h.jsx)(o.a,{path:"/graph",component:ce})]})})},ue=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,41)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,r=t.getLCP,l=t.getTTFB;a(e),n(e),s(e),r(e),l(e)}))};l.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(he,{})}),document.getElementById("root")),ue()}},[[40,1,2]]]);
//# sourceMappingURL=main.671ff468.chunk.js.map