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
    var journeyDate = '15-11-2015';
    var trainNumber = '12155'; // your train number will go here (it should be in the list of trains in the result, else no responsibility of mine).
    var travelClass = '3A' // travel class 1A, 2A, 3A, SL --support for EC CC and 2S is pending. */
    var sourceStationFull = 'BHOPAL  JN - BPL';
    var destinationStationFull = 'H NIZAMUDDIN - NZM';
    var sourceStationCode = 'BPL';
    var destinationStationCode = 'NZM';
    var quota = 'CK' // GN (for general) , CK (for tatkal)
    var username = '';
    var password = '';

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

    var firstPassengerName='';
    var firstPassengerAge = '';
    var firstPassengerGender = 'M' // M or F
    var firstPassengerBirthPreference = 'LB' // LB, MB, UB, SU, SL

    if($("input[name='j_idt131:j_idt133:j_idt137']").length > 0 ) {
       $("input[name='j_idt131:j_idt133:j_idt137']").click(); // its for handling the page which asks us to 'continue' in a new session if previous session existed.
    }
    if($("input[name='j_username']").length > 0){ //checks if the user is at the login page
        $("input[name='j_username']").val(username); // your username should go here
        $("input[name='j_password']").val(password); // your password should go here
        $("input[name='j_captcha']").focus();
        $("#loginerrorpanel_shade").hide(); // takes care of automatically hiding the "Invalid Captcha" dialogue box if it shows
        $("#loginerrorpanel_container").hide(); // takes care of automatically hiding the "Invalid Captcha" dialogue box if it shows
    }

    if($("input[name='jpform:fromStation']").length === 1) { //checks if the user is at page immediately after login
        var fromStation = $("input[name='jpform:fromStation']").val();
        if(fromStation.length < 2) {
            $("input[name='jpform:fromStation']").val(sourceStationFull); // input the source station value in FULL.
            $("input[name='jpform:toStation']").val(destinationStationFull); // input the destination station value in FULL.
            $("input[name='jpform:journeyDateInputDate']").val(journeyDate); // input the journey date here in the format dd-mm-yyyy
            $("input[name='jpform:jpsubmit']").click();
        }

        if($("input[type='radio'][value='GN'][name='quota']").length === 1) { // in a way checks whether the list of trains has loaded
            // in above statement ,3,false is default trailing params for function call for current journeyDate, it becomes ,8224,false for next travel date.
            // '-0' in jpBook is for selecting the first available day of journey (usually the journeyDate) it becomes '-1' for next travel date.
            // example of a tatkal booking call jpBook($('#12155-3A-CK-0'),'12155','BPL','NZM','15-11-2015','3A','CK',3,false);

            $("input[type='radio'][value='"+quota+"'][name='quota']").click(); // clicks the respective quota button.

            var travelClassId = '#cllink-'+trainNumber+'-'+travelClass+'-'+classNumber;
            $(travelClassId)[0].click(); //note the zero in square braces.

            setTimeout(function(){
                jpBook($('#'+trainNumber+'-'+travelClass+'-'+quota+'-0'),trainNumber,sourceStationCode,destinationStationCode,journeyDate,travelClass,quota,3,false);
            }, 2000);
        }
    }

    if($("tr[id='addPassengerForm:psdetail:0'][class='rf-dt-r rf-dt-fst-r']").length > 0) { // checks if passenger details filling page has opened.
        $("tr[id='addPassengerForm:psdetail:0'][class='rf-dt-r rf-dt-fst-r'] td:nth-child(2) input").val(firstPassengerName); //three level deep as id of input is dynamic.
        $("input[name='addPassengerForm:psdetail:0:psgnAge']").val(firstPassengerAge);
        $("select[name='addPassengerForm:psdetail:0:psgnGender']").val(firstPassengerGender);
        $("select[name='addPassengerForm:psdetail:0:berthChoice']").val(firstPassengerBirthPreference);
        $("#j_captcha").focus(); //after this, user manually needs to press next.
    }

    if($("input[type='radio'][id='NETBANKING'][value='1']").length > 0) { // basically checks whether the payment page has loaded.
        $("input[type='radio'][name='NETBANKING'][value='1']").click(); // value=1 is for SBI NETBANKING. Need to experiment more with other payment methods.
        $("input[type='button'][id='validate']").click(); // clicks and navigates to the payment gateway.
    }
});
