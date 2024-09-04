import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit{

  @ViewChild('map') divMap? : ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken: 'pk.eyJ1IjoidG9wb2l6aSIsImEiOiJjbHhkYnJhbmIwNGFzMmpwdWc5MDczNXh6In0.xMXU-40vOT3yTZkfFPQDQg',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return

      this.map?.zoomTo(18);
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value:string ) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
