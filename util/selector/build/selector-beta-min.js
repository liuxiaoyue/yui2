(function(){var Q=function(){};var B=YAHOO.util;var C={IDENT:"-?[_a-z]+[-\\w]*",BEGIN:"^",END:"$",HYPHEN:"-",OR:"|",S:"\\s*",SP:"\\s+"};var D={SIMPLE:"-+\\w_\\[\\]\\.\\|\\*\\'\\(\\)#:^~=$!\"",COMBINATORS:",>+~"};C.CAPTURE_IDENT="("+C.IDENT+")";C.BEGIN_SPACE="(?:"+C.BEGIN+C.OR+C.SP+")";C.END_SPACE="(?:"+C.SP+C.OR+C.END+")";C.SELECTOR="^("+C.CAPTURE_IDENT+"?(["+D.SIMPLE+"]*)?\\s*(["+D.COMBINATORS+"]?)?\\s*).*$";C.SIMPLE="("+C.CAPTURE_IDENT+"?(["+D.SIMPLE+"]*)*)?";C.ATTRIBUTES="\\[([a-z]+\\w*)+([~\\|\\^\\$\\*!=]=?)?\"?([^\\]\"]*)\"?\\]";C.PSEUDO=":"+C.CAPTURE_IDENT+"(?:\\({1}"+C.SIMPLE+"\\){1})*";C.NTH_CHILD="^(?:(\\d*)(n){1}|(odd|even)$)*([-+])*(\\d*)$";Q.prototype={document:window.document,attrAliases:{"for":"htmlFor","class":"className"},shorthand:{"#":"[id=$1]","\\.":"[className~=$1]"},operators:{"=":function(S,T){return S===T;},"!=":function(S,T){return S!==T;},"~=":function(S,U){var T=C.BEGIN_SPACE+U+C.END_SPACE;O[T]=O[T]||new RegExp(T);return O[T].test(S);},"|=":function(S,T){return G(C.BEGIN+T+"[-]?","g").test(S);},"^=":function(S,T){return S.indexOf(T)===0;},"$=":function(S,T){return S.lastIndexOf(T)===S.length-T.length;},"*=":function(S,T){return S.indexOf(T)>-1;},"":function(S,T){return S;}},pseudos:{"root":function(S){return S===S.ownerDocument.documentElement;},"nth-child":function(S,T){return F(S,T);},"nth-last-child":function(S,T){return F(S,T,null,true);},"nth-of-type":function(S,T){return F(S,T,S.tagName);},"nth-last-of-type":function(S,T){return F(S.parentNode,T,S.tagName,true);},"first-child":function(S){return Q.pseudos["nth-child"](S,1);},"last-child":function(T){var S=E(T.parentNode);return S[S.length-1];},"first-of-type":function(S,T){return E(S.parentNode,S.tagName.toLowerCase())[0];},"last-of-type":function(T,U){var S=E(T.parentNode,T.tagName.toLowerCase());return S[S.length-1];},"only-child":function(S){return(!B.Dom.getPreviousSibling(S)&&!B.Dom.getNextSibling(S));},"only-of-type":function(S){return E(S.parentNode,S.tagName.toLowerCase()).length===1;},"empty":function(S){return S.childNodes.length===0;},"not":function(S,T){return !Q.test(S,T);},"contains":function(S,T){return S.innerHTML.indexOf(T)>-1;}},test:function(T,S){T=Q.document.getElementById(T)||T;return R(T,S);},tokenize:function(U){if(!U){return[];}var W,Z=[],T,V=Q.attrAliases,S,Y=G(C.ATTRIBUTES,"g"),X=G(C.PSEUDO,"g");U=A(U);while(U.length&&G(C.SELECTOR).test(U)){W={previous:W,simple:RegExp.$1,tag:RegExp.$2.toLowerCase()||"*",predicate:RegExp.$3,attributes:[],pseudos:[],combinator:RegExp.$4};while(T=X.exec(W.predicate)){W.predicate=W.predicate.replace(T[0],"");W.pseudos[W.pseudos.length]=T.slice(1);}while(T=Y.exec(W.predicate)){if(V[T[1]]){T[1]=V[T[1]];}S=T.slice(1);if(S[1]===undefined){S[1]="";}W.attributes[W.attributes.length]=S;}W.id=M(W.attributes);if(W.previous){W.previous.combinator=W.previous.combinator||" ";}Z[Z.length]=W;U=P(U.substr(W.simple.length));}return Z;},filter:function(V,U){if(!V||!U){}var Y,W=V,T=[],Z=Q.tokenize(U);if(!W.item){for(var X=0,S=V.length;X<S;++X){if(!V[X].tagName){Y=Q.document.getElementByid(V[X]);if(Y){W[W.length]=Y;}else{}}}}T=N(W,Q.tokenize(U));return T;},queryAll:function(T,U){U=Q.document.getElementById(U)||U;var S=H(T,U);return S;},query:function(T,U){U=Q.document.getElementById(U)||U;var S=H(T,U);return S;}};var H=function(W,Z,a){if(!W){return[];}Z=Z||Q.document;var Y=Q.tokenize(W);var b=[],X=Y[L(Y)],S=[],U,T,V=Y.pop();if(X){T=M(X.attributes);}if(T){if(T===V.id){S=[Q.document.getElementById(T)]||Z;}else{U=Q.document.getElementById(T);if(Z===Q.document||Z.contains(U)){if(U&&R(U,null,X)){Z=U;}}else{return[];}}}if(Z&&!S.length){S=Z.getElementsByTagName(V.tag);}if(S.length){b=N(S,V,Z,a);I();}return b;};var N=function(S,W,b,c){var d=[],V=W.previous,T=false,Y=[],a=[],U;if(V&&V.combinator===","){Y=arguments.callee(b.getElementsByTagName(V.tag),V,b);for(var X=0,Z=Y.length;X<Z;++X){if(!Y[X]._found){Y[X]._found=true;a[a.length]=Y[X];J[J.length]=Y[X];}}d=d.concat(a);}for(var X=0,Z=S.length;X<Z;++X){U=S[X];if(!R(U,null,W)){continue;}if(c){return[U];}d[d.length]=U;}return d;};var R=function(U,X,W){W=W||Q.tokenize(X).pop();if(U._found||W.tag!="*"&&U.tagName.toLowerCase()!=W.tag){return false;}var T=Q.operators;var S=Q.pseudos;var a=W.attributes;var b=W.pseudos;var V=W.previous;for(var Y=0,Z=a.length;Y<Z;++Y){if(T[a[Y][1]]&&!T[a[Y][1]](U[a[Y][0]],a[Y][2])){return false;}}for(var Y=0,Z=b.length;Y<Z;++Y){if(S[b[Y][0]]&&!S[b[Y][0]](U,b[Y][1])){return false;}}if(V){if(V.combinator!==","){return K[V.combinator](U,W);}}return true;};var J=[];var O={};var I=function(){for(var T=0,S=J.length;T<S;++T){try{delete J[T]._found;}catch(U){J[T].removeAttribute("_found");}}J=[];};var G=function(T,S){S=S||"";if(!O[T+S]){O[T+S]=new RegExp(T,S);}return O[T+S];};var P=function(S){return S.replace(G(C.BEGIN+C.SP+C.OR+C.SP+C.END,"g"),"");};var K={" ":function(T,S){T=T.parentNode;while(T&&T.tagName){if(R(T,null,S.previous)){return true;}T=T.parentNode;}return false;},">":function(T,S){return R(T.parentNode,null,S.previous);},"+":function(U,T){var S=U.previousSibling;while(S&&S.nodeType!==1){S=S.previousSibling;}if(S&&R(S,null,T.previous)){return true;}return false;},"~":function(U,T){var S=U.previousSibling;while(S){if(S.nodeType===1&&R(S,null,T.previous)){return true;}S=S.previousSibling;}return false;}};var E=function(){if(document.documentElement.children){return function(T,S){return S?T.children.tags(S):T.children;};}else{return function(X,T){var W=[],Y=X.childNodes,U;for(var V=0,S=Y.length;V<S;++V){U=Y[V].tagName;if(U){if(!T||U.toLowerCase()===T){W[W.length]=Y[V];}}}return W;};}}();var F=function(U,e,g,Y){if(g){g=g.toLowerCase();}G(C.NTH_CHILD).test(e);var d=parseInt(RegExp.$1,10),T=RegExp.$2,Z=RegExp.$3,W=RegExp.$4||"+",c=parseInt(RegExp.$5,10)||0;if(isNaN(d)){d=1;}if(Z){d=2;W="+";T="n";c=(Z==="odd")?1:2;}var S=E(U.parentNode,g);var f=[];if((T&&!d)||(!T)){return U===S[c-1];}if(d===1){for(var V=0,X=S.length;V<X;V++){if(S[V]===U&&V>c-1){return true;}}}if(!Y){for(var V=c-1,X=S.length;V<X;V+=d){if(S[V]===U){return true;
}}}else{for(var V=S.length-c;V>=0;V-=d){if(S[V]===U){return true;}}}return false;};var M=function(T){for(var U=0,S=T.length;U<S;++U){if(T[U][0]=="id"&&T[U][1]==="="){return T[U][2];}}};var L=function(U){for(var T=0,S=U.length;T<S;++T){if(M(U[T].attributes)){return T;}}return -1;};var A=function(S){var T=Q.shorthand;for(var U in T){S=S.replace(G(U+C.CAPTURE_IDENT,"g"),T[U]);}return S;};Q=new Q();Q.CHARS=D;Q.TOKENS=C;B.Selector=Q;})();YAHOO.register("selector",YAHOO.util.Selector,{version:"@VERSION@",build:"@BUILD@"});