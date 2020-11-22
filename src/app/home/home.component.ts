import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';

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

  constructor(private quoteService: QuoteService) {

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

    this.mapa = new mapBox.Map({
      container: 'map-box-contain',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-99.0651, 19.31301],
      zoom: 12
    });
  }
  
}
