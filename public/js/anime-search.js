require("dotenv").config({ path: "../../.env" });
const axios = require("axios");


//types is TV OVA Movie

const genres = [
  "Award Winning",
  "Action",
  "Suspense",
  "Horror",
  "Ecchi",
  "Avant Garde",
  "Sports",
  "Supernatural",
  "Fantasy",
  "Gourmet",
  "Boys Love",
  "Drama",
  "Comedy",
  "Mystery",
  "Girls Love",
  "Slice of Life",
  "Adventure",
  "Romance",
  "Sci-Fi",
  "Erotica",
  "Hentai",
];
//https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc

//grabs json data of search based on anime name
//passed in variables can be restructured to use name, genre, and type if you want
//or we can pass in name, get the genre from axios get  list and run get again 
async function findAnimeList(aniSearch) {
  var queryURL = "https://anime-db.p.rapidapi.com/anime";

  const options = {
    method: "GET",
    url: "https://anime-db.p.rapidapi.com/anime",
    params: {
      page: "1",
      size: "10",
      search: aniSearch,
      sortBy: "ranking",
      sortOrder: "asc",
    },
    headers: {
      "X-RapidAPI-Key": process.env.DB_RAPIDKEY,
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data.data);
    return trimAnimeList(response.data.data);
  } catch (error) {
    console.error(error);
  }
}

//trims the get request form serside api to send back to handlebars to use
//or I can format it into HTML onbjects to append to the handlebar
function trimAnimeList(response) {
console.log(response.length);
const animeListJson = [];


for(let i = 0; i < response.length; i++)
{
    animeListJson.push({id: response[i]._id, title: response[i].title, 
        genres: response[i].genres, image: response[i].image, 
        synopsis: response[i].synopsis});
}

//the completed JSON to be used
console.log(JSON.parse(JSON.stringify(animeListJson)));

//returns the completed JSON to be used
//return JSON.parse(JSON.stringify(animeListJson));

/*returns obj array of the search result that can be used for html
formated as shown
animeListJson[index].id
animeListJson[index].title
animeListJson[index].genre --an array string
animeListJson[index].image
animeListJson[index].synopsis
to break into a json file you need to 
JSON.parse(JSON.stringify(animeListJson)
*/
return animeListJson;
}

findAnimeList("fullMetal");
