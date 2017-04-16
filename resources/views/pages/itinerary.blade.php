@extends('layouts.app')
@section('css')  
<link href="/assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
<link href="/assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />
<link href="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.css" rel="stylesheet"/>
<link href="/assets/css/views/leaflet-custom-popup.css" rel="stylesheet"/>
<link href="/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" />
<link href="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.css" rel="stylesheet"/>
<!--<link href="assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.css" rel="stylesheet"/>-->
<style>
    .control-form-full {
        width: 100% !important;
    }    
    .control-padding-right {
        padding-right: 15px !important;
    }
    .row-fluid{
        white-space: nowrap;
    }
    .row-fluid .col-md-2 .col-md-3 .col-md-4 {
        display: inline-block;
    }    
    /*Margin Bottom for mobile only*/
    @media (max-width: 978px) {
        .xs-margin {
            margin-bottom: 0px;
        }    

        .control-padding-right {            
            padding-right: 5px !important;
        }    
    }    
    #row-map {
        margin: 0;
    }
    .map-container {
        margin-bottom: 0 !important;
    }
    
    .gallery {
        padding: 0 !important;
    }
    .result-info {
        padding: 10px !important;
    }
    .image-info {
        padding: 0 !important;
    }
    .result-info .desc {
        margin-bottom: 0 !important;
    }
    .result-info .title {
        margin-bottom: 0 !important;
    }

</style>
@endsection        
@section('content')
<!-- begin #content -->
<div id="content" class="content p-5">
    <!-- begin page-header -->
    <!--<h1 class="page-header">Aqui vai o nome do Itinerário <small>header small text goes here...</small></h1>-->
    <!-- end page-header -->
    <div class="row" id="row-filter">
        <div class="col-md-12 p-0 m-l-5 m-r-5">                    
            <form id="form-search" class="form-inline"> 
                <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
                <div class="form-group col-md-6 p-5 xs-margin">
                    <input type="text" class="form-control control-form-full" id="input-location" placeholder="Onde ir?" />
                </div>
                <div class="form-group col-md-6 p-5 xs-margin control-padding-right">
                    <input type="text" class="form-control control-form-full" id="input-term" placeholder="O que você procura?" onkeypress="return submitForm(event)"/>
                </div>
                        <!--
                        <div class="form-group col-md-3 p-5 xs-margin">
                            <select id="select-city" name="select-city" class="form-control control-form-full"></select>
                        </div>
                        
                        <div class="form-group col-md-3 p-5 xs-margin">
                            <select id="select-category" name="select-category" class="form-control control-form-full"></select>
                        </div>     
                        
                        <div class="form-group col-md-2 p-5 xs-margin control-padding-right">
                            <button type="submit" class="btn btn-primary control-form-full">Pesquisar</button>       
                        </div>    
                    -->
                </form>                    
            </div>
            <!-- end col-12 -->
        </div>
        <!-- end row -->
        <div class="row" id="row-map">
            <!-- begin col-12 -->
            <!--<div class="col-md-12">-->
            <!-- begin panel -->
            <div id="panel-base-map" class="panel panel-inverse">
                <div class="panel-heading">     
                    <div class="btn-group dropdown pull-right m-l-5">
                        <button type="button" class="btn btn-success btn-xs"><i class="fa fa-cog"></i> Opções </button>
                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#modal-create-itinerary" data-toggle="modal" data-token="{{ csrf_token() }}" id="BtnNewItinerary">Criar novo Roteiro</a></li>      
                            <li><a href="#modal-list-itineraries" data-toggle="modal" data-token="{{ csrf_token() }}" id="BtnListItineraries">Visualizar meus Roteiores</a></li>                                  
                            <!--<li class="divider"></li>-->
                        </ul>
                    </div>  

                    <div id="group-legend" class="btn-group pull-right" data-toggle="buttons">
                    </div>

                    <h4 class="panel-title">Pesquisar locais</h4>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-0 map-container" data-full-height="true">
                            <div id="map" class="height-full width-full" style="z-index: 7">
                             @include('includes.sidebar-map')
                            </div>
                        </div>    
                    </div>  
                </div>
            </div>
            <!-- end panel -->
        </div>
    </div>
    <!-- end row -->
</div>
<!-- end #content -->
@include('modal.create-itinerary');
@endsection        

@section('javascript')  
<script src="/assets/plugins/underscore/underscore-1.8.3-min.js"></script>
<script src="/assets/plugins/leaflet/leaflet.js"></script>
<script src="/assets/plugins/Leaflet.ExtraMarkers-master/dist/js/leaflet.extra-markers.min.js"></script>
<script src="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.js" charset="utf-8"></script>
<script src="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.js"></script>
<script src="/assets/js/leaflet.js"></script>
<script src="/assets/js/view-helper.js"></script>
<script src="/assets/js/views/itinerary.js"></script>
<script src="/assets/plugins/select2/dist/js/select2.min.js"></script>
<script src="/assets/plugins/select2/dist/js/i18n/pt-BR.js"></script>
<script src="/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="/assets/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js"></script>
<!--<script src="assets/plugins/leaflet-custom-searchbox-master/dist/leaflet.customsearchbox.min.js"></script>-->
<!--<script src="assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.min.js"></script>-->
<script>

    function initAutocomplete() {
        var input = document.getElementById('input-location');
        var searchBox = new google.maps.places.SearchBox(input);

        searchBox.addListener('places_changed', function() {
            sidebar.hide();
            var places = searchBox.getPlaces();        
            if (places.length == 0) {
                return;
            }
            if (places.length == 1) {
                console.log(places);
                var position = places[0].geometry.location;

                setPosition({coords : {
                    latitude: position.lat(),
                    longitude: position.lng()
                }
            });
            }            
        });
    }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADvJvC_tbot0jWdVF6yKijrjXPicN3EFY&libraries=places&callback=initAutocomplete" async defer></script>
<script>
    $(document).ready(function() {        
        LeafletPlugin.init();             
        Itinerary.init();             
    });
</script>
@endsection        