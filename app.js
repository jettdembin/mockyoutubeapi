const searchForm = document.querySelector("#search-form");

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
        videoDiv.classList.add("video-div");
        videoDiv.innerHTML = `
          <img src=${video.thumbnails.high.url}>
          <h4>${video.title}</h4>
          <p>${video.channelTitle}</p>
          <p>${new Date(
            video.publishTime
            ).toLocaleDateString()}</p>
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
