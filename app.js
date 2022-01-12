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
        const id = item.id.videoId;
        const title = item.snippet.title;
        const time = item.snippet.publishTime;
        return item;
      });

      const container = document.querySelector("#video-divs");
      container.innerHTML = "";
      videoData.forEach(function (video) {
        const videoDiv = document.createElement("div");
        videoDiv.className = name1;
        videoDiv.classList.add(name2);
        videoDiv.innerHTML = `
          <div class="card h-100">
            <iframe width="100%" height="auto" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <div class="card-body position-relative">
              <h4 class="card-title text-center fs-5">
                <a href="https://www.youtube.com/embed/${video.id.videoId}">${video.snippet.title}</a>
              </h4>
              <div class="my-5 position-relative bottom-25">
                <p class="card-text text-center fs-6">${video.snippet.channelTitle}</p>
                <p class="text-center">${new Date(
                      video.snippet.publishTime
                ).toLocaleDateString()}</p>
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
        return item.snippet;
      });

      const container = document.querySelector("#video-divs");
      container.innerHTML = "";
      videoData.forEach(function (video) {
        const videoDiv = document.createElement("div");
        videoDiv.className = name1;
        videoDiv.classList.add(name2);
        videoDiv.innerHTML = `
          <div class="card h-100">
            <img class="card-img-top" src=${video.thumbnails.high.url} alt="${video.title}" />
            <div class="card-body position-relative">
              <h4 class="card-title text-center fs-5">
                <a href="${video.thumbnails.high.url}">${video.title}</a>
              </h4>
              <div class="my-5 position-relative bottom-25">
                <p class="card-text text-center fs-6">${video.channelTitle}</p>
                <p class="text-center">${new Date(
                      video.publishTime
                ).toLocaleDateString()}</p>
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
