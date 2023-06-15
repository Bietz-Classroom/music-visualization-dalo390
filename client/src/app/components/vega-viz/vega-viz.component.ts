import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from 'src/app/data/track-data';
import { TrackFeature } from 'src/app/data/track-feature';
import embed from 'vega-embed';

@Component({
  selector: 'app-vega-viz',
  templateUrl: './vega-viz.component.html',
  styleUrls: ['./vega-viz.component.css'],
})
export class VegaVizComponent implements OnInit {
  private spec: any;
  @Input() resourceId: string;
  trackInfo: TrackData[];
  trackFeature: TrackFeature[];

  @ViewChild('chartContainer') chartContainer: ElementRef;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.searchForTracks().then(() => {
      this.spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple bar chart with embedded data.",
        "title": "Energy of Playlist",
        "data": {
          "values": this.trackFeature
        },
        "mark": "bar",
        "encoding": {
          "x": { "field": "id", "type": "nominal", "axis": { "labelAngle": 0 } },
          "y": { "field": "percent", "type": "quantitative" }
        }
      };

      embed(this.chartContainer.nativeElement, this.spec);
    });
  }


  searchForTracks(): Promise<void>{
    //TODO: call search function in spotifyService with playlist href to get tracks array
    //console.log("searching " + this.resourceId);
    return this.spotifyService.getTracksForPlaylist(this.resourceId).then((result) => {
      //console.log("track info are ", result);
      return result;
    }).then((result) => {
      let fullString="";
      for(let track of result){
        fullString += track.id + ",";
      } 
      return this.spotifyService.getAudioFeaturesForTracks(fullString).then((result) => {
        //console.log("feature info ", result);
        this.trackFeature=result;
      }).catch((error) => {
        console.error('Error during search: ', error);
      });
    })
    .catch((error) => {
      console.error('Error during search: ', error);
    });
    //now i have all the tracks, iterate and get the feature information of all tracks    
  }
/*
  searchForFeature(track){
    this.spotifyService.getAudioFeaturesForTrack(track).then((result) => {
      console.log("feature info ", result);
      this.trackFeature=result;
    }).catch((error) => {
      console.error('Error during search: ', error);
    });
  }
*/
}
