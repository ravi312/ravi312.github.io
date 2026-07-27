document.querySelectorAll("a[href]").forEach(function (link) {
  var url = new URL(link.href, window.location.href);
  var isWebLink = url.protocol === "http:" || url.protocol === "https:";
  var isExternal = isWebLink && url.origin !== window.location.origin;
  var isPdf = url.pathname.toLowerCase().endsWith(".pdf");

  if (!isExternal && !isPdf) {
    return;
  }

  link.target = "_blank";
  link.relList.add("noopener", "noreferrer");

  var newTabText = "opens in a new tab";
  var title = link.getAttribute("title");
  if (!title) {
    link.setAttribute("title", "Opens in a new tab");
  } else if (!title.toLowerCase().includes(newTabText)) {
    link.setAttribute("title", title + " (opens in a new tab)");
  }

  var ariaLabel = link.getAttribute("aria-label");
  var visibleLabel = link.textContent.trim();
  var image = link.querySelector("img");
  var label = ariaLabel || visibleLabel || (image && image.alt);

  if (label && !label.toLowerCase().includes(newTabText)) {
    link.setAttribute("aria-label", label + " (opens in a new tab)");
  }
});
