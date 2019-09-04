(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(15),u=n.n(l),i=n(4),o=n.n(i),c=n(5),s=n(2),d=n(3),m=n.n(d),b={login:function(){var e=Object(c.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},f={getAll:function(){return m.a.get("/api/blogs").then(function(e){return e.data})},uploadBlog:function(e,t,n,a){var r={title:e,author:t,url:n},l={headers:{Authorization:"Bearer "+a}};return m.a.post("/api/blogs",r,l).then(function(e){return e.data})},updateLikes:function(e,t,n){var a={likes:e.likes+1},r="/api/blogs/"+e.id;return m.a.put(r,a).then(function(a){return n(t.map(function(t){return t.id===e.id?(t.likes=t.likes+1,t):t})),a.data})},deleteBlog:function(e,t,n,a){var r="/api/blogs/"+e.id,l={headers:{Authorization:"Bearer "+a}};if(window.confirm("Remove blog "+e.title+" by "+e.author+"?"))return m.a.delete(r,l).then(function(a){return n(t.filter(function(t){return t.id!==e.id})),a.data})}},p=function(e){var t=e.blog,n=e.selectedTitle,a=e.setSelectedTitle,l=e.updateLikes,u=e.blogs,i=e.setBlogs,o=e.deleteBlog,c=e.user,s={paddingTop:10,paddingLeft:2,border:"solid",borderWidth:1,marginBottom:5};return t.title===n?null===c||t.user.username!==c.username?r.a.createElement("div",{style:s},r.a.createElement("div",{onClick:function(){return a(null)}},t.title," ",t.author,r.a.createElement("br",null),t.url,r.a.createElement("br",null)," ",t.likes,r.a.createElement("button",{onClick:function(){return l(t,u,i)}}," like "),r.a.createElement("br",null),"Added by ",t.user.username)):r.a.createElement("div",{style:s},r.a.createElement("div",{onClick:function(){return a(null)}},t.title," ",t.author,r.a.createElement("br",null),t.url,r.a.createElement("br",null)," ",t.likes,r.a.createElement("button",{onClick:function(){return l(t,u,i)}}," like "),r.a.createElement("br",null),"Added by ",t.user.username,r.a.createElement("button",{onClick:function(){return o(t,u,i,c.token)}}," Delete Blog "))):r.a.createElement("div",{style:s},r.a.createElement("div",{onClick:function(){return a(t.title)}},t.title," ",r.a.createElement("br",null),t.author))},v=function(e){var t=e.handleLogin,n=e.username,a=e.setUsername,l=e.password,u=e.setPassword;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"username",r.a.createElement("input",{type:"text",value:n,name:"Username",onChange:function(e){var t=e.target;return a(t.value)}})),r.a.createElement("div",null,"password",r.a.createElement("input",{type:"password",value:l,name:"Password",onChange:function(e){var t=e.target;return u(t.value)}})),r.a.createElement("button",{type:"submit"},"login"))},g=function(e){var t=e.addBlog,n=e.newTitle,a=e.setNewTitle,l=e.newAuthor,u=e.setNewAuthor,i=e.newUrl,o=e.setNewUrl;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"title:",r.a.createElement("input",{type:"text",value:n,name:"title:",onChange:function(e){var t=e.target;return a(t.value)}})),r.a.createElement("div",null,"author:",r.a.createElement("input",{type:"text",value:l,name:"Author",onChange:function(e){var t=e.target;return u(t.value)}})),r.a.createElement("div",null,"url:",r.a.createElement("input",{type:"text",value:i,name:"Url",onChange:function(e){var t=e.target;return o(t.value)}})),r.a.createElement("button",{type:"submit"},"save"))},E=r.a.forwardRef(function(e,t){var n=Object(a.useState)(!1),l=Object(s.a)(n,2),u=l[0],i=l[1],o={display:u?"none":""},c={display:u?"":"none"},d=function(){i(!u)};return Object(a.useImperativeHandle)(t,function(){return{toggleVisibility:d}}),r.a.createElement("div",null,r.a.createElement("div",{style:o},r.a.createElement("button",{onClick:d},e.buttonLabel)),r.a.createElement("div",{style:c},e.children,r.a.createElement("button",{onClick:d},"cancel")))}),h=(n(40),function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],l=t[1],u=Object(a.useState)(""),i=Object(s.a)(u,2),d=i[0],m=i[1],h=Object(a.useState)(""),w=Object(s.a)(h,2),k=w[0],j=w[1],O=Object(a.useState)(""),y=Object(s.a)(O,2),B=y[0],S=y[1],C=Object(a.useState)(null),T=Object(s.a)(C,2),A=T[0],x=T[1],L=Object(a.useState)(null),N=Object(s.a)(L,2),U=N[0],D=N[1],P=Object(a.useState)(""),R=Object(s.a)(P,2),z=R[0],I=R[1],J=Object(a.useState)(""),V=Object(s.a)(J,2),W=V[0],H=V[1],q=Object(a.useState)(null),F=Object(s.a)(q,2),G=F[0],K=F[1],M=Object(a.useState)(null),Q=Object(s.a)(M,2),X=Q[0],Y=Q[1],Z=r.a.createRef();Object(a.useEffect)(function(){f.getAll().then(function(e){l(e)})},[]);var $=function(){var e=Object(c.a)(o.a.mark(function e(t){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.login({username:z,password:W});case 4:n=e.sent,K(n),I(""),H(""),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),x("Wrong credentials"),setTimeout(function(){x(null)},5e3);case 14:case"end":return e.stop()}},e,null,[[1,10]])}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Blogs"),null===A?void 0:r.a.createElement("div",{className:"error"},A),null===U?void 0:r.a.createElement("div",{className:"success"},U),null!==G?r.a.createElement("div",null,G.username," logged in.",r.a.createElement("button",{onClick:function(){return K(null)}},"logout")):void 0,r.a.createElement("h2",null,"Login"),null===G?r.a.createElement(v,{handleLogin:$,username:z,setUsername:I,password:W,setPassword:H}):r.a.createElement(E,{buttonLabel:"New Blog",ref:Z},r.a.createElement(g,{addBlog:function(e){e.preventDefault();try{f.uploadBlog(d,k,B,G.token),D(d+" has been added successfully!!"),l(n.concat({title:d,author:k,url:B,likes:0,user:G})),Z.current.toggleVisibility(),setTimeout(function(){D(null)},5e3)}catch(t){x(t),setTimeout(function(){x(null)},5e3)}},newTitle:d,setNewTitle:m,newAuthor:k,setNewAuthor:j,newUrl:B,setNewUrl:S})),n.sort(function(e,t){return t.likes-e.likes}).map(function(e){return r.a.createElement(p,{blog:e,selectedTitle:X,setSelectedTitle:Y,updateLikes:f.updateLikes,blogs:n,setBlogs:l,deleteBlog:f.deleteBlog,user:G})}))});u.a.render(r.a.createElement(h,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.f3ee8e8b.chunk.js.map