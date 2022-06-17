import { EProfile, EAmenity } from './../geo/geo.controller';

export class GetPlacesNearbyArgs {
    coord: { radius: number; lat: number; lng: number };
    amenity: EAmenity;

    constructor({ radius, lat, lng, amenity }) {
        this.coord = {
            radius,
            lat,
            lng,
        };
        this.amenity = amenity;
    }
}

export class GetDirectionArgs {
    coord: {
        latStart: number;
        lngStart: number;
        latEnd: number;
        lngEnd: number;
    };
    profile: EProfile;

    constructor({ latStart, lngStart, latEnd, lngEnd, profile }) {
        this.coord = {
            latStart,
            lngStart,
            latEnd,
            lngEnd,
        };
        this.profile = profile;
    }
}
