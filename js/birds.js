let wrapper=document.querySelector('.birds-wrap'),
		winner=document.querySelector('.winner'),
		cover='img/cover.jpg';
let variants=document.querySelectorAll('input[name="variant"]');
let complexityLength=8;
let imgFolder="img/birdsSmall2/";
let imgNames=fillImgNames(complexityLength,imgFolder);
let globalCounter=imgNames.length;
let imgWidth=window.outerWidth/Math.round(Math.sqrt(globalCounter*14));
let clickCounter=0, timeCounter=0;
let timer=document.querySelector('.timer');
let int, t;

clearInterval(int);
t=0;
timer.innerHTML=`Ваше время поиска ${t++} сек.`
mainPart(imgNames, document);
//genereteHTMLCode();	 
variants.forEach((e) => e.addEventListener('click', (item)=>{
	switch(item.target.value) {
	  case "1":
	  	imgFolder="img/birdsSmall2/";
	    break;
	  case "2":
	  	imgFolder="img/fishSmall2/";
	    break;
	  case "3":
	  	imgFolder="img/animalsSmall2/";
	  	break;
	  default:
	    break;
	};
	imgNames=fillImgNames(complexityLength,imgFolder);
	removeChild(wrapper);
	clearInterval(int);
	t=0;
	timer.innerHTML=`Ваше время поиска ${t++} сек.`
	mainPart(imgNames, document);

}));
/**************************************/
let complexity = document.querySelectorAll('input[name="complexity"]');

complexity.forEach((e) => e.addEventListener('click', (item)=>{
switch(item.target.value) {
  case "1":
  	complexityLength=4;
    break;
  case "2":
  	complexityLength=8;
    break;
  case "3":
  	complexityLength=12;
  	break;
  default:
    break;
};
	imgNames=fillImgNames(complexityLength,imgFolder);
	removeChild(wrapper);
	clearInterval(int);
	t=0;
	timer.innerHTML=`Ваше время поиска ${t++} сек.`
	mainPart(imgNames, document);
//	genereteHTMLCode();
}));

/************************************************/
function fillImgNames(complexityLength,imgFolder){
		let imgNames=[];
		for (let i=1; i<=complexityLength;i++){
			imgNames[i]=`${imgFolder}${i}.jpg`;
		}
		return imgNames;
}
	
let currentPict,
	  currentKey,
	  currentPictSibl,
	  prevElement, prevElementSibling, prevKey, prevElementScope, scopeKey, prevElementSiblingScope;


function fullArraysOfIdentity(ancestor) {
	let arr=[];
	for (let j=0; j<2; j++){
		for (let i=0; i<=ancestor.length; i++){
			if (j===0) {
					arr[(ancestor.length)*(j)+i]=i+'a';
			}	else {
				arr[(ancestor.length)*(j)+i]=i+'b';
			}
		}
	}
	arr.pop();
	arr.shift();
	arr.splice(ancestor.length-1,1);
	return arr;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function generateRandomSequencie(arr){
	let j, temp;
	for (let i=0; i<arr.length-1; i++) {
		j=getRandomIntInclusive(0, i);
		temp=arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

function togl(elem) {
	if (elem.classList.contains('off')) {
		elem.classList.add('on');
		elem.classList.remove('off');
	} else {
		elem.classList.remove('on');
		elem.classList.add('off');
	}
}

//----------------------------------------->
function removeChild(parent) {
	
  while (parent.firstChild) {
    parent.firstChild.remove();
}
}

function mainPart(imgNames, document) {
	clickCounter=0;
	timeCounter=0;
	let randomSequencie = fullArraysOfIdentity(imgNames);
	globalCounter=imgNames.length;
	randomSequencie=generateRandomSequencie(randomSequencie);
	//automatcally pushing picture from imgNames into html
	let birds__item, div1, div2;
	for (let i=0; i<=randomSequencie.length-1; i++) {// contein table of identity
			birds__item=document.createElement('div');
 			birds__item.classList.add('birds__item');
 			wrapper.appendChild(birds__item);
	
			div1=document.createElement('div');
			div1.classList.add('cover','off');
			birds__item.appendChild(div1);
			div1.insertAdjacentHTML('beforeend', `<img src="${cover}" data-key="${randomSequencie[i]}">`);
			div1.style.width=imgWidth+'px';
	
			div2=document.createElement('div');
			div2.classList.add('pictures', 'on');
			birds__item.appendChild(div2);
			div2.insertAdjacentHTML('beforeend', `<img src="${imgNames[randomSequencie[i].slice(0,randomSequencie[i].length-1)]}" data-key="${randomSequencie[i]}">`);
		div2.style.width=imgWidth+'px';
	}
/************************************************/
	let pictures=document.querySelectorAll('img');
	
	pictures.forEach(item => item.addEventListener('click', (e) => {
			if (e.target.classList.contains('close__img')) {
				document.querySelector(".reload").style.display="flex";
				winner.style.display="none";
			}
			clickCounter++;
			if (clickCounter===1){int=setInterval(()=>{timer.innerHTML=`Ваше время поиска ${t++} сек.`},1000)}
			currentPict=e.target.parentElement;
			currentKey=e.target.dataset.key;
			currentPictSibl=e.target.parentElement.nextElementSibling || e.target.parentElement.previousElementSibling;
			if (prevKey!=currentKey) {
				togl(currentPict);
				togl(currentPictSibl);
				if ((prevKey) && (prevKey.slice(0,prevKey.length-1) === currentKey.slice(0,currentKey.length-1))) {
					setTimeout(()=>{
						currentPict=e.target.parentElement;
						currentKey=e.target.dataset.key;
				 		currentPictSibl=e.target.parentElement.nextElementSibling || e.target.parentElement.previousElementSibling;	   
					  currentPict.remove();
				 	  currentPictSibl.remove();
				 	  prevElement.remove();
				 	  prevElementSibling.remove();
				 	  globalCounter--;
				 	  console.log(`glCounter=${globalCounter}`);
				 	  if (globalCounter<=1) {
				 	  	winner.style.display="flex";
				 	  	clearInterval(int);
				 	  }
					}, 700);
			 	currentPict=prevElementScope ;
			 	currentPictSibl =prevElementSiblingScope ;
			 	currentKey = scopeKey;
			} else {
				if (prevElementScope) {
	 			 	togl(prevElementScope);
				 	togl(prevElementSiblingScope);
				}
				 prevElementScope = prevElement;
				 prevElementSiblingScope = prevElementSibling;
				 scopeKey = prevKey;
				 prevElement=currentPict;
				 prevElementSibling=currentPictSibl;
				 prevKey=currentKey;
			}
	}
	})	
	);
	winner.addEventListener("submit", (e)=>{
		e.preventDefault();
		document.querySelector(".reload").style.display="flex";
	});
}

