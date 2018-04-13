const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDVwKrD_rPqHc4Vy2rnjNRn4YWlgwNoTas',
    q: searchTerm,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  return `
    <div class=video-name>${result.snippet.title}</div>
    <a href=${result.snippet.thumbnails.medium.url}>
        <img class=thumbnails src=${result.snippet.thumbnails.medium.url} alt=${result.snippet.title}>
    </a>
  `;
}

function displaySearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.search');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);