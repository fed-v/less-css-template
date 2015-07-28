/*jslint browser: true*/
/*global $, jQuery, console*/
/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
jQuery(document).ready(function ($) {

    'use strict';
    

    /****************************************/
    /***        Set copyright date       ***/
    /***************************************/

    //CREATE INSTANCE OF THE DATE OBJECT
    var date = new Date();

    //EXTRACT FOUR DIGIT YEAR AND ADD TO SPAN
    document.getElementById('year').innerHTML = date.getFullYear();

});
