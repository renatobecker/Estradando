var loadItineraries = function() {
    $("#itineraries-list").empty();
    var html = '';
    _.each(data.config.itineraries, function(item) { 
        var date = moment.unix(item.start_date.$date.$numberLong);
        var strDate = moment(date).format('DD/MM/YYYY');
        var itineraryDate = moment(item.created_at).fromNow();
        var destinationAddress = (item.destination.address) ?  ' - ' + (item.destination.address) : '';
        var render = '<li class="list-group-item">';
        render +=  '<div class="email-info">';
        render +=  '<span value="' + item.created_at + '" class="email-time">' + itineraryDate + '</span>';
        render +=  '</p>';
        render +=  '<h5 class="email-title">';
        render +=  item.name;
        render +=  '</h5>';
        render +=  '<div class="pull-right">'
        render +=  '<a href="/itinerary/' + item._id + '" class="btn btn-inverse btn-xs">Visualisar</a>';
        render +=  '</div>';
        render +=  '<p class="email-desc">';

        render +=  strDate + destinationAddress;
        render +=  '</li>';

        $("#itineraries-list").append( render );     
    });    
}

$('#modal-itineraries-list').on('shown.bs.modal', function (e) {
    refreshDateMessages();
});


var refreshDateMessages = function() {
    $('.email-time').each(function(i, obj) {
        var originalValue = $(this).attr('value');
        var newStrDate = moment(originalValue).fromNow();
         $(this).html(newStrDate);
    });
}

var ItinerariesList = function () {
    "use strict";
    return {
        //main function
        init: function () {
            loadItineraries();
        }
    };
}();