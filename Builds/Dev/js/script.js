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
