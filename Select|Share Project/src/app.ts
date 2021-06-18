import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';

type GoogleGeocodingResponse = { 
    results: {
        geometry: { 
            location: { lat: number; lng: number } 
        }
    }[];
    status: 'OK' | 'ZERO_RESULTS';
};

let map: google.maps.Map;
const loader = new Loader({
    apiKey: `${process.env.GOOGLE_MAP_API_KEY}`,
    version: "weekly"
});
  
loader.load().then(() => {
    map = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
        center: { lat: -1.3001307, lng: 36.7865379 },
        zoom: 15,
    });
});

const form = <HTMLFormElement>document.querySelector('form')!;
const addressInput = <HTMLInputElement>document.getElementById('address')!;

const searchAddressHandler = (event: Event) => {
    event.preventDefault();
    
    const enteredAddress = addressInput.value;
    const googleUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${process.env.GOOGLE_MAP_API_KEY}`;

    axios.get<GoogleGeocodingResponse>(googleUri).then(response => {
        const { results, status } = response.data;

        if (status !== 'OK') {
            throw new Error(`Fetching address '${enteredAddress}' failed.`);
        }

        const coordinates = results[0].geometry.location;

        map = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
            center: coordinates,
            zoom: 15,
        });

        new google.maps.Marker({
            position: coordinates,
            map: map,
        });
    }).catch(error => {
        alert(error.message)
        console.log(error);
    });
};

form.addEventListener('submit', searchAddressHandler);