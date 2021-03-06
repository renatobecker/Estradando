FB.init({
    appId      : '1998894127063898',
    xfbml      : true,
    cookie     : true,
    status     : true,
    version    : 'v2.9'
}); 

var searchFieldsDefault = "id,name,location,overall_star_rating,price_range,rating_count,hours,about,category,category_list,cover,restaurant_services,restaurant_specialties,website,parking,food_styles,payment_options,phone,were_here_count";//,events,current_location,description,contact_address,single_line_address,place_topic,name_with_location_descriptor,fan_count,general_info,is_always_open,is_permanently_closed,likes,link,checkins",
/*
var handleInit = function(response) {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1998894127063898',
            xfbml      : true,
            cookie     : true,
             status     : true,
            version    : 'v2.8'
        });
    };
*/
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));    
//}    
        
var facebookGraph = function(url, p, callback, offset) {
    FB.api(
        url,
        p,
        function (response) {
            if (response && !response.error) {
                if (callback) {
                    callback(response, p);
                }
                if (!offset) {
                    offset = 0;
                }

                if (p.limit) {
                    offset += (response.data) ? response.data.length : 0;
                }

                if ( ((!p.limit) || (offset < p.limit)) && (response.paging) ) {

                    facebookGraph(response.paging.next, p, callback, offset);
                }
            } else {
                console.log(response);
            }
        } //, {access_token: data.config.facebook.user_token}
    );    
}

var facebookPlace = function(id, callback) {
    var url = id + '?fields=' + searchFieldsDefault + '&locale=pt_BR';
    FB.api(
        url,
        function (response) {
            if (response && !response.error) {
                if (callback) {
                    callback(response);
                }
            }
        }, {access_token: data.config.facebook.user_token}
    );    
}

var facebookSearch = function(params, callback) {
    var distance = (params.distance) ? params.distance : 2000;
    var center = params.geolocation.latitude + "," + params.geolocation.longitude;
    var p = {
        "distance": distance,
        //"limit": 100,
        "center": center,
        "q": (params.term ? params.term : ""),
        "type": "place",                
        "fields": searchFieldsDefault,
        "locale": "pt_BR"
    }
    if ( ( params.categories ) && ( params.categories.length > 0 )) {
        var list = params.categories.join();
        p["categories"] = '[' + list + ']';
    }
    if (params.limit) {
        p["limit"] = params.limit;
    }

    if (params.price) {
        p["price_range"] = params.price;   
    }
    console.log(p);
    facebookGraph("/search", p, callback);
}

var facebookInviteFriends = function(msg, url, callback, excludes) {
        FB.ui({
            method: 'apprequests',
            message: msg,
            redirect_uri: url,
            data: url,
            exclude_ids: excludes,
            title: "Seleção de participantes",
            //new_style_message: true
        }, callback);
    }

var Facebook = function () {
    "use strict";
    return {
        //main function
        init: function () {
            //handleInit();
        }
    };
}();