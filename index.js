

var sampleImage = { 
	path: 'https://i0.wp.com/diabetes-cure.me/wp-content/uploads/2017/12/cute-baby.jpg', 
	name: "random"
};

var sampleImage1 = { 
	path: 'https://resources.stuff.co.nz/content/dam/images/1/j/l/j/e/t/image.related.StuffLandscapeSixteenByNine.620x349.1ntr05.png/1515623893992.jpg', 
	name: "random"
};

var images = [sampleImage, sampleImage1];

function updateImages() {
  console.log("Loaded images");
  images = JSON.parse(this.responseText);

  showNextImage();
}

var req = new XMLHttpRequest();
req.addEventListener("load", updateImages);
req.open("GET", "images.json");
req.send();

function getRandomImage() {
	var index = Math.floor(Math.random() * images.length);
	console.log("index", index)
	return images[index];
}

function getNewImageState() {
	return {
		currentImage: getRandomImage(),
		isAnswered: false,
		isCorrectAnswer: undefined,
		activeTimeout: undefined
	};
}

var appState = getNewImageState();

function processStateChange(state) {
	appState = state;
	render(appState);
}

function render(state) {

	document.querySelector("#app").innerHTML = 
		runderButtons(state) +
		renderImage(state) +
		renderAnswer(state);
}
// function 

// Actions - assumes global state
function showNextImage() {
	console.log("showNextImage()");
	clearTimeout(appState.activeTimeout);

	appState = getNewImageState();

	processStateChange(appState);
}

function select(answer) {
	appState.isAnswered = true;
	appState.isCorrectAnswer = appState.currentImage.name === answer;
	appState.activeTimeout = setTimeout(showNextImage, 2000);
	processStateChange(appState);
}

function runderButtons(state) {
	return state.isAnswered ? "" : 
		"<div class='left' onclick='select(\"leo\")'>L&eacute;o</div>" +
		"<div class='right' onclick='select(\"benoit\")'>Beno&icirc;t</div>";
}

function renderImage(state) {
  return "<img class='image' src='" + state.currentImage.path + "'>";
}

function renderAnswer(state) {
	var html = '';	
	if (state.isAnswered) {
		html = state.isCorrectAnswer ? renderCorrect() : renderWrong();
	}
	return html;
}

function renderCorrect() {
	return "<div class='correct answer'>&#10004;</div>"
}

function renderWrong() {
	return "<div class='wrong answer'>&#10006;</div>"
}



