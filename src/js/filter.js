function openVar(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("var-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("filter__links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active";
  }