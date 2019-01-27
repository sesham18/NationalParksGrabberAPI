'use strict';

const apiKey = 'RbJZ1qm96wU9A1CLcV4VBcWfeBxPWuapxjU4SStD';
const searchURL = 'https://api.nps.gov/api/v1/parks';


function displayResults(responseJson) {
 console.log(responseJson);
 var arr = responseJson;
 let lenTotal = arr.data.length;
 console.log(arr.data.length);
 console.log(arr.data[0].description);
 for (let i = 0; i < lenTotal; i++){
  $('#results-list').append(
   `<li><h3>${arr.data[i].name}</h3>
   <p> ${arr.data[i].description}</p>
   <p> <a href="${arr.data[i].url}"> URL for National Park </p>
   </li>`
  );
 };
 $('#results').removeClass('hidden');
};

function getNP(query, maxResults=50) {
  const url = searchURL + '?api_key=' + apiKey + '&stateCode='+ query + "&" + 'limit=' + maxResults;
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
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNP(searchTerm, maxResults);
  });
}

$(watchForm);