const searchForm = document.querySelector("#search-form");
const name1 = "col-lg-6";
const name2 = "mb-4";
const generateRandomNum = Math.floor((Math.random() * 10) + 1);


//<img class="card-img-top" src=${video.thumbnails.high.url} alt="${video.title}" />

//show random videos on load
document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
      const res = JSON.parse(xhttp.responseText);
      const videoData = res.items.map(function (item) {
        return item;
      });

      const container = document.querySelector("#video-divs");
      container.innerHTML = "";
      videoData.forEach(function (video) {
        const id = video.id.videoId;
        const title = video.snippet.channelTitle;
        const time = video.snippet.publishTime;
        const videoDiv = document.createElement("div");
        videoDiv.className = name1;
        videoDiv.classList.add(name2);
        videoDiv.innerHTML = `
          <div class="card h-100">
            <iframe width="100%" height="200px" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
            <div class="card-body position-relative">
              <h4 class="card-title text-center fs-5">
                <a href="https://www.youtube.com/embed/${id}">${title}</a>
              </h4>
              <div class="position-relative">
                <p class="card-text text-center fs-6">${title}</p>
                <p class="text-center">${new Date(time).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        `;
        container.appendChild(videoDiv);
      });
    }
  };
  const randomQuery = ['surfing', 'sand', 'forest', 'programming', 'island', 'dancing', 'sports', 'mountains', 'ocean', 'stars'];
  const randomVideos = randomQuery[generateRandomNum];
  xhttp.open(
    "GET",
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${randomVideos}&maxResults=10&key=AIzaSyC1a4sUXhmThdjkYtgFlmcdBd-6Km3GS8s`,
    true
  );
  xhttp.send();
});


searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
      const res = JSON.parse(xhttp.responseText);
      const videoData = res.items.map(function (item) {
        return item;
      });

      const container = document.querySelector("#video-divs");
      container.innerHTML = "";
      videoData.forEach(function (video) {
        const id = video.id.videoId;
        const title = video.snippet.channelTitle;
        const time = video.snippet.publishTime;
        const videoDiv = document.createElement("div");
        videoDiv.className = name1;
        videoDiv.classList.add(name2);
        videoDiv.innerHTML = `
        <div class="card h-100">
          <iframe width="100%" height="200px" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
          <div class="card-body position-relative">
            <h4 class="card-title text-center fs-5">
              <a href="https://www.youtube.com/embed/${id}">${title}</a>
            </h4>
            <div class="position-relative">
              <p class="card-text text-center fs-6">${title}</p>
              <p class="text-center">${new Date(time).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        `;
        container.appendChild(videoDiv);
      });
    }
  };
  const textValue = document.querySelector("#search-bar").value;
  xhttp.open(
    "GET",
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=10&key=AIzaSyC1a4sUXhmThdjkYtgFlmcdBd-6Km3GS8s`,
    true
  );
  xhttp.send();
});
