var loadTimeline = function() {
    if ( (data.config.itinerary == null) || 
         (data.config.itinerary.places_info == null) ||
         (data.config.itinerary.places_info.length == 0) ) {
        $("#timeline-list").removeClass("timeline").empty();
        $("#timeline-list").append( '<p id="empty-timeline" class="text-center">Ainda não há locais no roteiro.</p>' );     
        return;        
    }
    var startDate = moment.unix(data.config.itinerary.start_date.$date.$numberLong);
    var endDate   = moment.unix(data.config.itinerary.end_date.$date.$numberLong);
    var title = "Timeline do Roteiro - " + moment(startDate).format('DD/MM/YY');
    if (data.config.itinerary.start_date.$date.$numberLong !== 
        data.config.itinerary.end_date.$date.$numberLong) {
        title += " até " + moment(endDate).format('DD/MM/YY');
    }
    $("#timeline-title").html(title);
    var html = '';
    $("#timeline-list").addClass("timeline").empty();
    var places = _.sortBy(data.config.itinerary.places_info, function(o) { 
        return o.place_datetime ? o.place_datetime.$date.$numberLong : 0;
    });
    _.each(places, function(place) { 
        /*var date = moment.unix(place.start_date.$date.$numberLong);
        var strDate = moment(date).format('DD/MM/YYYY');
        var itineraryDate = moment(item.created_at).fromNow();
        var destinationAddress = (item.destination.address) ?  ' - ' + (item.destination.address) : '';*/
        var imgCover = (_.isObject(place.cover)) ? place.cover.source : null;
        var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : place.category;  
        var address  = renderText(place.location.street) + ' - ' + renderText(place.location.zip)  + '<br />';
        address   += renderText(place.location.city) + ' - ' + renderText(place.location.state);
        var place_day = '';
        var place_time = '';
        if (place.place_datetime) {
            var datetime = moment.unix(place.place_datetime.$date.$numberLong);              
            place_day = moment(datetime).calendar();
            //place_time = moment(datetime).format('LT');
        }
        var render = '<li>';
        render +=  '<div class="timeline-time">';
        render +=  '<span class="date">' + place_day + '</span>';
        //render +=  '<span class="time">' + place_time + '</span>';        
        render +=  '</div>';
        render +=  '<div class="timeline-icon">';
        render +=  '<a href="javascript:;"><i class="fa fa-paper-plane"></i></a>';
        render +=  '</div>';
        render +=  '<div class="timeline-body">';
        render +=  '<div class="timeline-header">';
        render +=  '<span class="userimage"><img src="'+ place.user.avatar +'" alt="" /></span>';
        render +=  '<span class="username"><a href="javascript:;">' + place.user.name + '</a> <small></small></span>';
        //render +=  '<span class="pull-right text-muted">18 Views</span>';
        render +=  '</div>';
        render +=  '<div class="timeline-content">';
        //render +=  '<p class="m-t-20">';
        if (imgCover) {
          render +=  '<img src="' + place.cover.source + '" alt="" />';            
        }
        render +=  '<h5>' + place.name + '</h5>';
        if (category) {
            render += '<strong>' + category + '</strong>';
        }
        render +=  '<address>';
        render +=  address;
        render +=  '</<address>';
        //render +=  '</p>';
        render +=  '</div>';
        /*
        render +=  '<div class="timeline-footer">';
        render +=  '<a href="javascript:;" class="m-r-15"><i class="fa fa-thumbs-up fa-fw"></i> Like</a>';
        render +=  '<a href="javascript:;"><i class="fa fa-comments fa-fw"></i> Comment</a>';
        render +=  '</div>';
        */
        render +=  '</div>';
        render +=  '</li>';
        $("#timeline-list").append( render );     
    });    
}

$('#modal-timeline').on('shown.bs.modal', function (e) {
    loadTimeline();
});

var renderText = function(text) {
    return (typeof text != 'undefined') ? text : '';
}
