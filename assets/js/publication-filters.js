(function () {
  var buttons = Array.from(
    document.querySelectorAll("[data-publication-filter]")
  );
  var publications = Array.from(
    document.querySelectorAll("[data-publication-topics]")
  );
  var status = document.getElementById("publication-filter-status");

  if (!buttons.length || !publications.length) {
    return;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var selectedTopic = button.dataset.publicationFilter;
      var visibleCount = 0;

      buttons.forEach(function (filterButton) {
        filterButton.setAttribute(
          "aria-pressed",
          String(filterButton === button)
        );
      });

      publications.forEach(function (publication) {
        var topics = publication.dataset.publicationTopics.split(" ");
        var isVisible =
          selectedTopic === "all" || topics.includes(selectedTopic);

        publication.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (status) {
        status.textContent =
          "Showing " +
          visibleCount +
          " of " +
          publications.length +
          " publications.";
      }
    });
  });
})();
