
interface DataResponse {
  name: string;
  formatted_address: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    },
  },
  opening_hours: {
    open_now: boolean;
  },
}
export class ListPlacesService {
  async execute({apiKey, city, uf}) {
    const placesApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=recycling+centers+in+${city}+${uf}&key=${apiKey}`;

    try {
      const response = await fetch(placesApiUrl);
      const data = await response.json();
      const formattedData = data.results.map((result: DataResponse) => ({
        name: result.name,
        formatted_address: result.formatted_address,
        place_id: result.place_id,
        opening_hours:{
          open_now:  result.opening_hours ? result.opening_hours.open_now : undefined
        },
        geometry: {
          location: {
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          },
        },
      }));
      return formattedData;


    } catch (error) {
      throw new Error('Error when searching for recycling points.');
    }
  }
}
