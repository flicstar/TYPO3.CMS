!function(a){"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(CodeMirror)}(function(a){"use strict";var b={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},c={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,allowMissingTagName:!1,caseFold:!1};a.defineMode("xml",function(d,e){function f(a,b){function c(c){return b.tokenize=c,c(a,b)}var d=a.next();if("<"==d)return a.eat("!")?a.eat("[")?a.match("CDATA[")?c(i("atom","]]>")):null:a.match("--")?c(i("comment","-->")):a.match("DOCTYPE",!0,!0)?(a.eatWhile(/[\w\._\-]/),c(j(1))):null:a.eat("?")?(a.eatWhile(/[\w\._\-]/),b.tokenize=i("meta","?>"),"meta"):(A=a.eat("/")?"closeTag":"openTag",b.tokenize=g,"tag bracket");if("&"==d){var e;return e=a.eat("#")?a.eat("x")?a.eatWhile(/[a-fA-F\d]/)&&a.eat(";"):a.eatWhile(/[\d]/)&&a.eat(";"):a.eatWhile(/[\w\.\-:]/)&&a.eat(";"),e?"atom":"error"}return a.eatWhile(/[^&<]/),null}function g(a,b){var c=a.next();if(">"==c||"/"==c&&a.eat(">"))return b.tokenize=f,A=">"==c?"endTag":"selfcloseTag","tag bracket";if("="==c)return A="equals",null;if("<"==c){b.tokenize=f,b.state=n,b.tagName=b.tagStart=null;var d=b.tokenize(a,b);return d?d+" tag error":"tag error"}return/[\'\"]/.test(c)?(b.tokenize=h(c),b.stringStartCol=a.column(),b.tokenize(a,b)):(a.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function h(a){var b=function(b,c){for(;!b.eol();)if(b.next()==a){c.tokenize=g;break}return"string"};return b.isInAttribute=!0,b}function i(a,b){return function(c,d){for(;!c.eol();){if(c.match(b)){d.tokenize=f;break}c.next()}return a}}function j(a){return function(b,c){for(var d;null!=(d=b.next());){if("<"==d)return c.tokenize=j(a+1),c.tokenize(b,c);if(">"==d){if(1==a){c.tokenize=f;break}return c.tokenize=j(a-1),c.tokenize(b,c)}}return"meta"}}function k(a,b,c){this.prev=a.context,this.tagName=b,this.indent=a.indented,this.startOfLine=c,(x.doNotIndent.hasOwnProperty(b)||a.context&&a.context.noIndent)&&(this.noIndent=!0)}function l(a){a.context&&(a.context=a.context.prev)}function m(a,b){for(var c;;){if(!a.context)return;if(c=a.context.tagName,!x.contextGrabbers.hasOwnProperty(c)||!x.contextGrabbers[c].hasOwnProperty(b))return;l(a)}}function n(a,b,c){return"openTag"==a?(c.tagStart=b.column(),o):"closeTag"==a?p:n}function o(a,b,c){return"word"==a?(c.tagName=b.current(),B="tag",s):x.allowMissingTagName&&"endTag"==a?(B="tag bracket",s(a,b,c)):(B="error",o)}function p(a,b,c){if("word"==a){var d=b.current();return c.context&&c.context.tagName!=d&&x.implicitlyClosed.hasOwnProperty(c.context.tagName)&&l(c),c.context&&c.context.tagName==d||x.matchClosing===!1?(B="tag",q):(B="tag error",r)}return x.allowMissingTagName&&"endTag"==a?(B="tag bracket",q(a,b,c)):(B="error",r)}function q(a,b,c){return"endTag"!=a?(B="error",q):(l(c),n)}function r(a,b,c){return B="error",q(a,b,c)}function s(a,b,c){if("word"==a)return B="attribute",t;if("endTag"==a||"selfcloseTag"==a){var d=c.tagName,e=c.tagStart;return c.tagName=c.tagStart=null,"selfcloseTag"==a||x.autoSelfClosers.hasOwnProperty(d)?m(c,d):(m(c,d),c.context=new k(c,d,e==c.indented)),n}return B="error",s}function t(a,b,c){return"equals"==a?u:(x.allowMissing||(B="error"),s(a,b,c))}function u(a,b,c){return"string"==a?v:"word"==a&&x.allowUnquoted?(B="string",s):(B="error",s(a,b,c))}function v(a,b,c){return"string"==a?v:s(a,b,c)}var w=d.indentUnit,x={},y=e.htmlMode?b:c;for(var z in y)x[z]=y[z];for(var z in e)x[z]=e[z];var A,B;return f.isInText=!0,{startState:function(a){var b={tokenize:f,state:n,indented:a||0,tagName:null,tagStart:null,context:null};return null!=a&&(b.baseIndent=a),b},token:function(a,b){if(!b.tagName&&a.sol()&&(b.indented=a.indentation()),a.eatSpace())return null;A=null;var c=b.tokenize(a,b);return(c||A)&&"comment"!=c&&(B=null,b.state=b.state(A||c,a,b),B&&(c="error"==B?c+" error":B)),c},indent:function(b,c,d){var e=b.context;if(b.tokenize.isInAttribute)return b.tagStart==b.indented?b.stringStartCol+1:b.indented+w;if(e&&e.noIndent)return a.Pass;if(b.tokenize!=g&&b.tokenize!=f)return d?d.match(/^(\s*)/)[0].length:0;if(b.tagName)return x.multilineTagIndentPastTag!==!1?b.tagStart+b.tagName.length+2:b.tagStart+w*(x.multilineTagIndentFactor||1);if(x.alignCDATA&&/<!\[CDATA\[/.test(c))return 0;var h=c&&/^<(\/)?([\w_:\.-]*)/.exec(c);if(h&&h[1])for(;e;){if(e.tagName==h[2]){e=e.prev;break}if(!x.implicitlyClosed.hasOwnProperty(e.tagName))break;e=e.prev}else if(h)for(;e;){var i=x.contextGrabbers[e.tagName];if(!i||!i.hasOwnProperty(h[2]))break;e=e.prev}for(;e&&e.prev&&!e.startOfLine;)e=e.prev;return e?e.indent+w:b.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"<!--",blockCommentEnd:"-->",configuration:x.htmlMode?"html":"xml",helperType:x.htmlMode?"html":"xml",skipAttribute:function(a){a.state==u&&(a.state=s)}}}),a.defineMIME("text/xml","xml"),a.defineMIME("application/xml","xml"),a.mimeModes.hasOwnProperty("text/html")||a.defineMIME("text/html",{name:"xml",htmlMode:!0})});