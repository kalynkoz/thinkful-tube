const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_LINK_URL = 'https://youtu.be/'

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDVwKrD_rPqHc4Vy2rnjNRn4YWlgwNoTas',
    q: searchTerm,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function createVideoMarkup(item) {
  return `
    <div class="videoResult">
        <h3 class="video-name">${item.snippet.title}</div>
        <a href=\"${YOUTUBE_LINK_URL + item.id.videoId}\">
            <img class="thumbnails" src=\"${item.snippet.thumbnails.medium.url}\" alt=\"${item.snippet.title}\">
        </a>
    </div>
  `;
}

function displaySearchData(data) {
  const items = data.items.map((item, index) => {
    if(item.id.kind === 'youtube#video') {
     return createVideoMarkup(item);
    }
  });
  $('.js-search-results').html(items);
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
  .prop('hidden', false);
}

$(watchSubmit);