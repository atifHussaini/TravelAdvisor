import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
    try {
        const { data : { data }} = await axios.get(URL, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Key': '27222d7395mshfe816f8942c146cp1618c2jsn087538b7436c',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
        });
        return data;
    } catch(error){
        console.log(error)
    }
};