import * as chroma from 'chroma-js';

export class TrackFeature {
	static FeatureTypes = ['danceability', 'energy', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence'];

	id:string;
	name:string;
	energy:number;
	danceability:number

	constructor(feature:string) {
		this.name = feature;
	}
}
