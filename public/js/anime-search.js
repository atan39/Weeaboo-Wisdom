const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("test");
  let name = document.querySelector('#anime-name');
  let genre = document.querySelector('#anime-genre');
  let type = document.querySelector('#anime-type');

  //checks for null entries in form sumbit
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


//grabs json data of search based on anime name or genre and/or type

async function findAnimeList(name, genres, type) {
  //checks genres against possible inputs that api allow
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

  //formated parsed genres to pass in
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
  
  //checks types against possible inputs that api allow
  let typeList =["TV", "OVA", "Movie"];
  //formated parsed types to pass in
  let typeUrlList =["TV%2C%20", "OVA%2C%20", "Movie%2C%20"];
  
console.log(genres);
    //checks if they enter a name or genre. If neither then an alert
  if(name || genres)
  {

    //checking genre entry
    //didn't complete error entry handling
    if(genres)
    {
      //checks entries against genrelist and makes the parsed string to pass in
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
    
    //checking type entry. Defaults to TV if nothing is passed
    if(type)
    {
      //checks entries against typeList and makes the parsed string to pass in
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

    //checks if name is null
    if(!name)
    {
      name = "";
    }
    //parses the name entry for api
    else{
      let aniemName = name.split(" ");
      name = "";
      for (let i = 0; i < aniemName.length; i++)
      {
        name+= aniemName[i] + "%20"
      }
    }
    //calls anime-db using parsed string
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
    //trims and formats the data
    return trimAnimeList(result.data);
    } catch (error) {
      console.error(error);
    }
}
else {
  alert('You need to enter a genre and/or anime');
}

}

//trims the get request form serside api
function trimAnimeList(response) {
const animeListJson = [];

//formats the reponse data to be used to print html and saved onto Anime table if saved
for(let i = 0; i < response.length; i++)
{
    animeListJson.push({id: response[i]._id, title: response[i].title, 
        genre: response[i].genres.join(', '), imageUrl: response[i].image, 
        synopsis: response[i].synopsis});
}

console.log(JSON.parse(JSON.stringify(animeListJson)));

//resets a previous anime db search request. if this is the first request, then nothing
let content = document.querySelector('#anime-results');
if(content.hasChildNodes())
  {
    removeAllChildNodes(content)
  }

//dynamically makes HTML objects of all anime to show on search page 
for(let i = 0; i < animeListJson.length; i++)
{
  printResult(animeListJson[i]);
}

return animeListJson;
}

//helper function to remove dynamically made HTML 
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

//creates html object of passed in anime
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
  
  //save function in save button that makes a POST request to Anime Table
  saveBtn.addEventListener('click', async function (event) {

    console.log(event.target.id);
    //console.log(anime.id);

    //POST doesn't like something.id so I converted into variables
    let id = anime.id;
    let title = anime.title;
    let genre = anime.genre;
    let imageUrl = anime.imageUrl;
    let synopsis = anime.synopsis;
    console.log(id);
    console.log(title);
    console.log(genre);
    console.log(imageUrl);
    console.log(synopsis);

    const response = await fetch(`/api/animes/`, {
      method: 'POST',
      body: JSON.stringify({ id, title, genre, imageUrl, synopsis }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //document.location.replace('/');
    } else {
      alert('Failed to add anime.');
    }
    
  })
}
document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);




