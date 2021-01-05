var backButton = document.getElementById("back-button");

backButton.addEventListener("click", function () {
  history.go(-2);
});
