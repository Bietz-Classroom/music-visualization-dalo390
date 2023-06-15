import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { parse } from 'vega';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //This function uses the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). 
    return lastValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encoeURIComponent().
    //Depending on the category (artist, track, album, playlist, etc.), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but thered are other ways of building the array.
    let encodededResource =  encodeURIComponent(resource);
    //let result = this.sendRequestToExpress('/search/' + category +'/' + encodededResource);
    //let resultArr = result.playlists;
    return this.sendRequestToExpress('/search/' + category +'/' + encodededResource).then((data) => {
      let parsedResponse=data.playlists.items;
      let mappedData=parsedResponse.map((item) => {
        return{
          url:item.href,
          imageURL:item.images[0].url,
          name:item.name,
          tracks:item.tracks,
          id:item.id
        };
      });
      //console.log(mappedData);
      return mappedData;
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return null as any;
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
   return null as any;
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return null as any;
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return null as any;
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return null as any;
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return null as any;
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return null as any;
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + trackId).then((data) =>{
      return new TrackFeature("energy",data.energy);
    });
  }

  getAudioFeaturesForTracks(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let encodeded =  encodeURIComponent(trackId);
    return this.sendRequestToExpress('/tracks-audio-features/' + encodeded).then((data) =>{
      let parsedResponse=data.audio_features;
      let mappedData=parsedResponse.map((item) => {
        return{
          id:item.id,
          percent:item.energy
        };
      })
      return mappedData;
    });
  }


  getTracksForPlaylist(playlistID:string):Promise<TrackData[]> {
    console.log("in services");
    let encoded = encodeURIComponent(playlistID);
    return this.sendRequestToExpress('/playlists-tracks/'+ encoded).then((data) => {      
      let parsedResponse=data.items;
      let mappedData=parsedResponse.map((item) => {
        return{
          artists:item.track.artists,
          name: item.track.name,
          id: item.track.id
        };
      });
      //console.log("mapping", mappedData);
      
      return mappedData;
    });

  }
}
