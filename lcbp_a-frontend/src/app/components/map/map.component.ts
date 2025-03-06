import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

// Fix Leaflet's missing icon issue
const iconRetinaUrl = 'leaflet/marker_map_icon.png';
const iconUrl = 'leaflet/marker_map_icon.png';
const shadowUrl = 'leaflet/marker-shadow.png';

const defaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [41, 41],
  iconAnchor: [20, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [14,42],
});

L.Marker.prototype.options.icon = defaultIcon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  markers: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.map = L.map('map').setView([43.60805, 3.876038], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  setMarker(lat: number, lon: number) {
    this.markers.push(L.marker([lat, lon]).addTo(this.map));
    this.map.flyTo([lat, lon], 16, {
      animate: true,
      duration: 2
    });
  }
}

