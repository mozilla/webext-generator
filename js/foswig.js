!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Foswig=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
function Node(e){this.character=e,this.neighbors=[]}function TrieNode(){this.children=[]}function addToDuplicatesTrie(e,t){e.length>1&&addToDuplicatesTrie(e.substr(1),t);for(var r=t,o=0;o<e.length;++o){var n=r.children[e[o]];n||(n=new TrieNode,r.children[e[o]]=n),r=n}}function isDuplicate(e,t){e=e.toLowerCase();for(var r=t,o=0;o<e.length;++o){var n=r.children[e[o]];if(!n)return!1;r=n}return!0}module.exports=function(e){this.order=e,this.duplicates=new TrieNode,this.start=new Node(""),this.map={}},module.exports.prototype.addWordsToChain=function(e){for(var t=0;t<e.length;++t)this.addWordToChain(e[t])},module.exports.prototype.addWordToChain=function(e){addToDuplicatesTrie(e.toLowerCase(),this.duplicates);for(var t=this.start,r="",o=0;o<e.length;++o){var n=e[o];r+=n,r.length>this.order&&(r=r.substr(1));var i=this.map[r];i||(i=new Node(n),this.map[r]=i),t.neighbors.push(i),t=i}t.neighbors.push(null)},module.exports.prototype.generateWord=function(e,t,r,o){"undefined"==typeof e&&(e=0),"undefined"==typeof r&&(r=!0),"undefined"==typeof t&&(t=-1),"undefined"==typeof o&&(o=25);var n,i,a=0;do{i=!1;var h=Math.floor(Math.random()*this.start.neighbors.length),s=this.start.neighbors[h];for(n="";s&&(0>t||n.length<=t);)n+=s.character,h=Math.floor(Math.random()*s.neighbors.length),s=s.neighbors[h];(n.length>t||n.length<e)&&(i=!0)}while(i||!r&&++a<o&&isDuplicate(n,this.duplicates));if(a>=o)throw new Error("Unable to generate a word with the given parameters after "+a+" attempts");return n};
},{}]},{},[1])
(1)
});