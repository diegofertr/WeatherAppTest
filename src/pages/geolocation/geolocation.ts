import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import leaflet from 'leaflet'

declare var google

@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html'
})

export class GeolocationPage {
  options: GeolocationOptions
  currentPos: Geoposition
  // @ViewChild('map') mapElement: ElementRef
  // map: any
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) { }

  // loadmap() {
  //   this.map = leaflet.map("map").fitWorld();
  //   leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attributions: 'www.tphangout.com',
  //     maxZoom: 18
  //   }).addTo(this.map);
  //   this.map.locate({
  //     setView: true,
  //     maxZoom: 10
  //   }).on('locationfound', (e) => {
  //     let markerGroup = leaflet.featureGroup();
  //     let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
  //       alert('Marker clicked');
  //     })
  //     markerGroup.addLayer(marker);
  //     this.map.addLayer(markerGroup);
  //     }).on('locationerror', (err) => {
  //       alert(err.message);
  //   })
  // }

  addMap(lat,long){
    let latLng = new google.maps.LatLng(lat, long);
    
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
    console.log("Creando un marcador")
  }
  
  getUserPosition(){
    this.options = {
        enableHighAccuracy : false
    };
  
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
        this.currentPos = pos;
        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
  }

  ionViewDidEnter() {
    this.getUserPosition();
    // this.loadmap();
  }
  
}
