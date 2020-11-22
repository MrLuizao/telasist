import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { PinsJsonService } from 'src/app/services/pins-json.service'
import { QuoteService } from './quote.service';
import * as mapBox from 'mapbox-gl'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  mapa: mapBox.Map;
  data: string[] = [];

  cordsObj: any [] = [];

  constructor(private quoteService: QuoteService, public pinService: PinsJsonService) {

    (mapBox as typeof mapBox).accessToken = environment.mapBoxKey;
  
  }

  ngOnInit() {

    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });

    const mockData = [{ long: -99.14669, lati: 19.43177 }]
      
    this.mapa = new mapBox.Map({
      container: 'map-box-contain',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [mockData[0].long, mockData[0].lati],
      zoom: 10
    });

    this.dataFromService();

  }

  dataFromService(){
    this.pinService.getC5cdmxPins().subscribe( (resp) =>{
      this.data = resp['records']

      const mapObj = this.data.map( (obj)=>{

        return obj ['fields']
      
      });
      this.data = mapObj

      const coords = this.data.map( (obj)=>{

        return obj ['geo_point_2d']
      
      });
      this.data = coords

      coords.forEach((item)=>{

        let dataNew = {
          lati: item[0],
          long: item[1]
        }
        this.cordsObj.push(dataNew)

        this.pinsOnMap(dataNew.long, dataNew.lati)

      });   

      console.log('cordsObj:', this.cordsObj);
      
    })
  }

  pinsOnMap(long:number, lati:number){

    const marker = new mapBox.Marker()
    .setLngLat([long, lati])
    .addTo( this.mapa )

  }
  
}
