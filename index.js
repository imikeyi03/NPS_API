'use strict';

// put your own value below!
const apiKey = 'zKjHLuiq7nX0z3KIGbLy4GNlTNpD7OLfb7S0oyNQ'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';
let fields = 'images';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#js-results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each state park object in the items 
    //array, add a list item to the results 
    //list with the park title, description,
    //and link
    
    $('#js-results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <h4>Directions:</h4>
      <p>${responseJson.data[i].directionsInfo}</p>
      <img src="${responseJson.data[i].images[0].url}" alt="State Park image">
      <a href="${responseJson.data[i].url}" target="_blank">Park Website</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');

};

function getStateParks(query, limit) {
  const params = {
    limit,
    stateCode: query,
    fields: fields,
    api_key: apiKey,
    
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-park-state').val();
    const limit = $('#js-max-results').val();
    getStateParks(searchTerm, limit);
  });
}

$(watchForm);
