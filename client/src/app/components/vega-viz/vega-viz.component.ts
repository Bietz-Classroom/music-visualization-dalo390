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
        "description": "Energy and Danceability of Songs",
        "data": {"values" : this.trackFeature},
        "mark": "point",
        "encoding": {
          "tooltip": {"field": "name", "type": "nominal"},
          "x": {"field": "energy", "type": "quantitative"},
          "y": {"field": "danceability", "type": "quantitative"}
        }
      };

      embed(this.chartContainer.nativeElement, this.spec);
    });
  }

  //get tracks and features of playlist
  searchForTracks(): Promise<void>{
    //call search function in spotifyService with playlist id to get tracks array
    return this.spotifyService.getTracksForPlaylist(this.resourceId).then((tracks) => {
      return tracks;
    }).then((tracks) => {
      //concatenate all track ids
      let fullString="";
      for(let track of tracks){
        fullString += track.id + ",";
      } 
      //call search function in spotifyService with track ids to get features of tracks
      return this.spotifyService.getAudioFeaturesForTracks(fullString).then((features) => {
        this.trackFeature=features.map((item, index) => {
          const trackWithFeatures:TrackFeature={
            id: item.id,
            energy: item.energy,
            danceability: item.danceability,
            name: tracks[index].name,
          }
          return trackWithFeatures;
        });
      });
    })
    .catch((error) => {
      console.error('Error during search: ', error);
    });
  }
}
