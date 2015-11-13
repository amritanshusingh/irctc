// ==UserScript==
// @name         IRCTC Automation Script
// @namespace    http://www.amritanshusingh.com/
// @version      0.1
// @description  Automating the terribly painful task of booking IRCTC tickets.
// @author       Amritanshu Singh
// @match        https://www.irctc.co.in/eticketing/*
// @grant        2015+, amritanshusingh.com
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(document).ready(function(){
    if($("input[name='j_username']").length > 0){ //checks if the user is at the login page
        $("input[name='j_username']").val(''); // your username should go here
        $("input[name='j_password']").val(''); // your password should go here
        $("input[name='j_captcha']").focus();
        $("#loginerrorpanel_shade").hide(); // takes care of automatically hiding the "Invalid Captcha" dialogue box if it shows
        $("#loginerrorpanel_container").hide(); // takes care of automatically hiding the "Invalid Captcha" dialogue box if it shows
    }
    if($("input[name='jpform:fromStation']").length === 1) { //checks if the user is at page immediately after login
        var fromStation = $("input[name='jpform:fromStation']").val();
        if(fromStation.length < 2) {
            $("input[name='jpform:fromStation']").val('BHOPAL  JN - BPL'); // input the source station value in FULL.
            $("input[name='jpform:toStation']").val('H NIZAMUDDIN - NZM'); // input the destination station value in FULL.
            $("input[name='jpform:journeyDateInputDate']").val('15-11-2015'); // input the journey date here in the format dd-mm-yyyy
            $("input[name='jpform:jpsubmit']").click();
        }

        if($("input[type='radio'][value='CK'][name='quota']").length === 1) { // in a way checks whether the list of trains has loaded
            $("input[type='radio'][value='CK'][name='quota']").click(); // clicks the tatkal radio button, why else would you be using this script. Duh!!!
            var trainNumber = '12615'; // your train number will go here (it should be in the list of trains in the result, else no responsibility of mine).
            var travelClass = '3A' // travel class 1A, 2A, 3A, SL --support for EC CC and 2S is pending.

            /* TRICKY PART
            if your train has classes ex:- 1A, 2A, 3A, SL
            numbering of the following variable will go like
            1A -> 0
            2A -> 1
            3A -> 2
            SL -> 3
            if your train has classes ex:- 2A, 3A, SL
            2a -> 0 and so on.
            So name the following variable carefully.
             TRICKY PART ENDS */
            var classNumber = 2;

            alert($('#j_idt335_body').length); //untested, must alert 0 or 1, if 1 is alerted means travelClass has been clicked and availability table is visible
            /*var travelClassId = '#cllink-'+trainNumber+'-'+travelClass+'-'classNumber;
            $(travelClassId).click(); */
        }
    }
});
