'use stirct';

var elem = document.querySelector('.active')
var arrLink = document.querySelectorAll('.control-sup-base a');
var startElemPos = arrLink[0].getBoundingClientRect();
var controlList = document.querySelector('.control-base');
var slides = document.querySelectorAll('#slides .slide');
var countNum = 0;
var temperaryColor;
var timerInterval;
	
//function rendering item slide	

function rendering(){
	for(var i = 0; i < slides.length; i++){
		slides[i].className = 'slide';
	}
	slides[countNum].className = 'slide showing';
};

//function positioning active element

function positioningElement(activeElement){
	var elemCoords = activeElement.getBoundingClientRect();

	elem.style.left = elemCoords.left + 'px';
	elem.style.top = (elemCoords.top + window.pageYOffset) + 'px';
	elem.style.width = (elemCoords.right - elemCoords.left) + 'px';
	activeElement.style.color = 'white';

	if(!temperaryColor) {
		temperaryColor = activeElement;
	} else if(temperaryColor != activeElement){
		temperaryColor.style.color = 'gray';
		temperaryColor = activeElement;
	}

	rendering();
};

//start position

positioningElement(arrLink[0]);

//function from setTimeout

var extendPositioning = function(){
		if(countNum == arrLink.length - 1) countNum = -1;
		countNum++;
		positioningElement(arrLink[countNum]);
};

//start setTimeout

timerInterval = setInterval(extendPositioning, 3000);

//Event

controlList.addEventListener('click', function(e){
		e.preventDefault();
		var target = e.target;

		clearInterval(timerInterval);
		if(target.tagName != 'A') return;

		if(target.classList.contains("item-control")){
			countNum = +target.dataset.number;
			positioningElement(target);
		};

		if(target.classList.contains("arrow-right")){
				if(countNum == arrLink.length - 1) countNum = -1;
				countNum++
				positioningElement(arrLink[countNum]);
		}; 

		if(target.classList.contains("arrow-left")){
				countNum--;
				if(countNum < 0) countNum = arrLink.length - 1;
				positioningElement(arrLink[countNum]);
		};

		 timerInterval = setInterval(extendPositioning, 3000)
});
