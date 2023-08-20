//require("dotenv").config({ path: "../../.env" });
//put back after testing
//const axios = require("axios");

//5dd6af73bamsh0ef3eaf05df8638p1cb45djsna87e7ac7ba52

const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("test");
  let name = document.querySelector('#anime-name');
  let genre = document.querySelector('#anime-genre');
  let type = document.querySelector('#anime-type');

  if(name)
  {
    name = name.value.trim();
  }
  if(genre)
  {
    genre = genre.value.trim()
  }
  if(type)
  {
    type = type.value.trim()
  }


  findAnimeList(name, genre, type);
}


//types is TV OVA Movie

//grabs json data of search based on anime name
//passed in variables can be restructured to use name, genre, and type if you want
//or we can pass in name, get the genre from axios get  list and run get again 
async function findAnimeList(name, genres, type) {
  let genreList = [
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

  //console.log(genreList[0].toLowerCase());
  
  let genreUrlList = [
    "Award%20Winning%2C%20",
    "Action%2C%20",
    "Suspense%2C%20",
    "Horror%2C%20",
    "Ecchi%2C%20",
    "Avant%20Garde%2C%20",
    "Sports%2C%20",
    "Supernatural%2C%20",
    "Fantasy%2C%20",
    "Gourmet%2C%20",
    "Boys%20Love%2C%20",
    "Drama%2C%20",
    "Comedy%2C%20",
    "Mystery%2C%20",
    "Girls%20Love%2C%20",
    "Slice%20of%20Life%2C%20",
    "Adventure%2C%20",
    "Romance%2C%20",
    "Sci-Fi%2C%20",
    "Erotica%2C%20",
    "Hentai%2C%20",
  ];
  
  let typeList =["TV", "OVA", "Movie"];
  let typeUrlList =["TV%2C%20", "OVA%2C%20", "Movie%2C%20"];
  
console.log(genres);
    //checks if they enter a name or genre
  if(name || genres)
  {

    //checking genre entry fix later
    if(genres)
    {
      //genres.replace(/\s/g, '');
      const genreArray = genres.split(",");
      genres = "";
      for(let i = 0; i < genreArray.length; i++)
      {
        for(let j = 0; j < genreList.length; j++)
        {
          if(genreArray[i].toLowerCase() === genreList[j].toLowerCase())
          {
            genres+= genreUrlList[j];
          }
        }
      }
    }
    else{
      genres = "";
    }
    

    if(type)
    {
      const typesArray = type.split(",");
      type = "";
      for(let i = 0; i < typesArray.length; i++)
      {
        for(let j = 0; j < typeList.length; j++)
        {
          if(typesArray[i].toLowerCase() === typeList[j].toLowerCase())
          {
            type+= typeUrlList[j];
          }
        }
      }
    }
    else{
      type = "TV";
    }

    if(!name)
    {
      name = "";
    }
    else{
      let aniemName = name.split(" ");
      name = "";
      for (let i = 0; i < aniemName.length; i++)
      {
        name+= aniemName[i] + "%20"
      }
    }
    
    /*
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=fullmetal';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5dd6af73bamsh0ef3eaf05df8638p1cb45djsna87e7ac7ba52',
		'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
     */
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=20&search=' + name + '&genres='+genres +'&sortBy=ranking&sortOrder=asc&types=' + type;
    console.log(url);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5dd6af73bamsh0ef3eaf05df8638p1cb45djsna87e7ac7ba52',
		    'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
    };
    
    try {
      console.log(url);
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return trimAnimeList(result.data);
    } catch (error) {
      console.error(error);
    }
  
    
    /*
    const options = {
     method: "GET",
      url: "https://anime-db.p.rapidapi.com/anime",
     params: {
        page: "1",
        size: "20",
        search: name,
        genres: genres,
       sortBy: "ranking",
        sortOrder: "asc",
        types: type
      },
      headers: {
        //"X-RapidAPI-Key": process.env.DB_RAPIDKEY,
        "X-RapidAPI-Key": "5dd6af73bamsh0ef3eaf05df8638p1cb45djsna87e7ac7ba52",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(options);
      //console.log(response.data.data);
      return trimAnimeList(response.data.data);
    } 
    catch (error) {
      console.error(error);
    }
    */
}
else {
  alert('You need to enter a genre and/or anime');
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
        genre: response[i].genres.join(', '), imageUrl: response[i].image, 
        synopsis: response[i].synopsis});
}

//console.log(animeListJson[0].genres);

//the completed JSON to be used
console.log(JSON.parse(JSON.stringify(animeListJson)));

//returns the completed JSON to be used
//return JSON.parse(JSON.stringify(animeListJson));

/*
returns obj array of the search result that can be used for html
formated as shown
animeListJson[index].id
animeListJson[index].title
animeListJson[index].genre --an array string
animeListJson[index].imageUrl
animeListJson[index].synopsis
to break into a json file you need to 
JSON.parse(JSON.stringify(animeListJson)
*/
let content = document.querySelector('#anime-results');
if(content.hasChildNodes())
  {
    removeAllChildNodes(content)
  }

for(let i = 0; i < animeListJson.length; i++)
{
  printResult(animeListJson[i]);
}

return animeListJson;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function printResult(anime){

  let content = document.querySelector('#anime-results');
  let result = document.createElement("div");
  let animeNameEl = document.createElement("p");
  animeNameEl.textContent = anime.title; 
  animeNameEl.style.justifyContent = "center";
  result.append(animeNameEl);
  let imageEl = document.createElement('img'); 
  imageEl.src = anime.imageUrl;
  result.append(imageEl);
  let animeGengreEl = document.createElement('p');
  animeGengreEl.innerHTML = '<strong> Genre(s): </strong> ' + anime.genre + '</br>'; 
   
  let animeSypnosisEl = document.createElement('p');
  animeSypnosisEl.innerHTML = '<strong> Sypnosis: </strong> ' + anime.synopsis + '</br>'; 
  result.append(animeGengreEl, animeSypnosisEl);

  saveBtn = document.createElement('button');
  saveBtn.setAttribute("value", anime.id)
  saveBtn.classList.add("button","is-medium", "is-dark","is-responsive","is-rounded"); //style with bulma
  saveBtn.textContent = "Save";
  result.append(saveBtn);

  content.append(result);

  /*
  let resultCard = document.createElement("div");
  resultCard.classList.add("card");

  let resultHeader = document.createElement("header");
  resultHeader.classList.add("card-header");
  resultCard.append(resultHeader);

  let animeNameEl = document.createElement("p");
  animeNameEl.classList.add("card-header-title");
  animeNameEl.textContent = anime.title; 
  animeNameEl.style.justifyContent = "center";
  resultHeader.append(animeNameEl);

  let resultBody = document.createElement("div");
  resultBody.classList.add("card-content", "is-size-5-mobile", "is-size-5-touch", "is-size-5-tablet", "is-size-5-desktop", "is-size-5-widescreen", "is-size-5-fullhd");
  resultCard.append(resultBody);

  //create media div for image
  let mediaDiv = document.createElement("div");
  mediaDiv.classList.add("media");
  resultBody.append(mediaDiv);

  let leftImageDiv = document.createElement("div");
  leftImageDiv.classList.add("media-left");
  leftImageDiv.style.width = "20%";
  mediaDiv.append(leftImageDiv);

  
  let imageFigure = document.createElement("figure");
  imageFigure.classList.add("image"); 
  leftImageDiv.append(imageFigure);

  let imageEl = document.createElement('img'); 
  imageEl.src = anime.image;
  imageFigure.append(imageEl);

  let mediaContent = document.createElement("div");
  mediaContent.classList.add("media-content");
  mediaDiv.append(mediaContent);


  let animeGengreEl = document.createElement('p');
  animeGengreEl.innerHTML = '<strong> Genre(s): </strong> ' + anime.genres + '</br>'; 
   
  let animeSypnosisEl = document.createElement('p');
  animeSypnosisEl.innerHTML = '<strong> Sypnosis: </strong> ' + anime.genres + '</br>'; 

  mediaContent.style.textAlign = "left";
  mediaContent.append(animeGengreEl, animeSypnosisEl);  
  
  saveBtn = document.createElement('button');
  saveBtn.classList.add("button","is-medium", "is-dark","is-responsive","is-rounded"); //style with bulma
  saveBtn.textContent = "Save";
*/
  //look at later
  
  saveBtn.addEventListener('click', async function (event) {

    console.log(event.target.id);
    console.log(anime);
    //if (event.target.hasAttribute('data-id')) {
      //const id = event.target.getAttribute('data-id');
      // const response = await fetch(`/api/animes/`, {
      //   method: 'POST',
      //   body: JSON.stringify(event.target.id),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
  
      // if (response.ok) {
      //   //document.location.replace('/profile');
      // } else {
      //   alert('Failed to create project');
      // }
    //}
  

  });

  /*
  let cardFooter = document.createElement("footer");
  cardFooter.classList.add("card-footer");
  resultCard.append(cardFooter);
    
  cardFooter.style.justifyContent = "center";
  cardFooter.style.paddingTop = "8px";
  cardFooter.style.paddingBottom = "20px";
  cardFooter.append(saveBtn);
*/
}
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

//findAnimeList("fullMetal", "", "");



