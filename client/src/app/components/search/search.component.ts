import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'playlist';
  resources:ResourceData[];
  message:string = '';

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((resourceData) => {
      if(resourceData.length > 0){
        this.resources=resourceData;
        this.message ='';
      }
      else{
        this.resources=resourceData;
        this.message = 'No search results found.';
      }
    }).catch((error) => {
      console.error('Error during search: ', error);
    });    
  }

}
