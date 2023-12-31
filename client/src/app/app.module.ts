import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { VegaVizComponent } from './components/vega-viz/vega-viz.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselCardComponent } from './components/carousel-card/carousel-card.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackListComponent,
    HomePageComponent,
    VegaVizComponent,
    CarouselComponent,
    CarouselCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
