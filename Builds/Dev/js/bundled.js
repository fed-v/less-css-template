(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {

    //////////////////////////////////////////////////////
    ///     Set copyright date
    //////////////////////////////////////////////////////


    // Create Instance of the Date Object
    var date = new Date();

    // Extract Four Digit Year and Add to Footer
    document.getElementById('year').innerHTML = date.getFullYear();

};

},{}],2:[function(require,module,exports){
/*jslint browser: true*/
/*global $, jQuery, console, require*/
/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
jQuery(document).ready(function ($) {

    'use strict';

    // Style Console Messages: "%c" tells the console that the rest of the message should be formatted
    // using CSS. You can pass the CSS styles as a parameter.
    var consoleStyles = "color:purple; font-weight:bold; margin-left:20px";
    console.log("%c Console with styles added to it.", consoleStyles);


    // Call External Dependency
    var setCopyrightDate = require('./copyrightDate');
    setCopyrightDate();

});

},{"./copyrightDate":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZHMvZGV2L2pzL2NvcHlyaWdodERhdGUuanMiLCJidWlsZHMvZGV2L2pzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8vICAgICBTZXQgY29weXJpZ2h0IGRhdGVcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAvLyBDcmVhdGUgSW5zdGFuY2Ugb2YgdGhlIERhdGUgT2JqZWN0XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgLy8gRXh0cmFjdCBGb3VyIERpZ2l0IFllYXIgYW5kIEFkZCB0byBGb290ZXJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5ZWFyJykuaW5uZXJIVE1MID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxufTtcclxuIiwiLypqc2xpbnQgYnJvd3NlcjogdHJ1ZSovXHJcbi8qZ2xvYmFsICQsIGpRdWVyeSwgY29uc29sZSwgcmVxdWlyZSovXHJcbi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgdmFyczogdHJ1ZSwgcmVnZXhwOiB0cnVlLCBzbG9wcHk6IHRydWUgKi9cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvLyBTdHlsZSBDb25zb2xlIE1lc3NhZ2VzOiBcIiVjXCIgdGVsbHMgdGhlIGNvbnNvbGUgdGhhdCB0aGUgcmVzdCBvZiB0aGUgbWVzc2FnZSBzaG91bGQgYmUgZm9ybWF0dGVkXHJcbiAgICAvLyB1c2luZyBDU1MuIFlvdSBjYW4gcGFzcyB0aGUgQ1NTIHN0eWxlcyBhcyBhIHBhcmFtZXRlci5cclxuICAgIHZhciBjb25zb2xlU3R5bGVzID0gXCJjb2xvcjpwdXJwbGU7IGZvbnQtd2VpZ2h0OmJvbGQ7IG1hcmdpbi1sZWZ0OjIwcHhcIjtcclxuICAgIGNvbnNvbGUubG9nKFwiJWMgQ29uc29sZSB3aXRoIHN0eWxlcyBhZGRlZCB0byBpdC5cIiwgY29uc29sZVN0eWxlcyk7XHJcblxyXG5cclxuICAgIC8vIENhbGwgRXh0ZXJuYWwgRGVwZW5kZW5jeVxyXG4gICAgdmFyIHNldENvcHlyaWdodERhdGUgPSByZXF1aXJlKCcuL2NvcHlyaWdodERhdGUnKTtcclxuICAgIHNldENvcHlyaWdodERhdGUoKTtcclxuXHJcbn0pO1xyXG4iXX0=
