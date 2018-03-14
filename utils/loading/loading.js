(function () {
  var playLoadingAnimation = false
  var container = null
  var loadingEl = null

  const loadingSetup = () => {
    container = document.querySelector(".loading-animated")
    loadingEl = document.querySelector(".loading-animated .loading")
    loadingEl.addEventListener("transitionend", function () {
      if (playLoadingAnimation) {
        const expanded = loadingEl.className.includes("amiibo")
        setTimeout(() => loadingEl.className = expanded ? "loading" : "loading amiibo", 250)
      } else {
        loadingEl.className = "loading amiibo"
      }
    }, false)
  }

  window.showLoading = () => {
    if (!loadingEl) {
      loadingSetup()
    }
    loadingEl.className = "loading amiibo"
    container.style.display = "";
    playLoadingAnimation = true
    setTimeout(() => loadingEl.className = "loading", 250)
  }

  window.hideLoading = () => {
    container.style.display = "none";
    playLoadingAnimation = false
  }
})()
