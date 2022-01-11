const searchForm = document.querySelector("#search-form");
const name1 = "col-lg-6";
const name2 = "mb-4";


searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
      const res = JSON.parse(xhttp.responseText);
      const videoData = res.items.map(function (item) {
        console.log(item.snippet);
        return item.snippet;
      });

      const container = document.querySelector("#video-divs");
      container.innerHTML = "";
      videoData.forEach(function (video) {
        console.log(video);
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
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${textValue}&maxResults=24&key=AIzaSyD__xp_1OfaDNZgHmFFW2FHijdQrk00p90`,
    true
  );
  xhttp.send();
});
