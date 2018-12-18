//-> Select the element inside which cats names are displayed
const listOfCats = document.querySelector('#cats-container');

//-> Select the element that will contain the cat image
const imgContainer = document.querySelector('.img-container');


//-> Array containing all the paths of the cats images 
const imgsOfCatsArr = ['img/realCat1.jpg', 'img/realCat2.jpg', 'img/realCat3.jpg', 'img/realCat4.jpg', 'img/realCat5.jpg'];

//-> Array containing the names of cats
const namesOfCats = ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5'];

//-> Variable for the document fragment
const docFrag = document.createDocumentFragment();

//-> Variable to increment index of the imgsOfCatsArr
let indexOfCat = 0; 


//-> Create  a list of cat names in the DOM 
for (const name of namesOfCats) {
   let link = document.createElement('a');
   link.textContent = name;
   link.href = imgsOfCatsArr[indexOfCat];  
   docFrag.appendChild(link);
   indexOfCat++;
   listenForClicksOnName(link, name);   
} 
listOfCats.appendChild(docFrag);


//-> Function that adds an event listener for each name element 
function listenForClicksOnName(element, name) {
   element.addEventListener('click', (event) => {
      event.preventDefault();
      
      //-> Remove the previous title and img first
      cleanTheStage();
      
      //-> We add the new image to stage
      let imgPath = element.getAttribute('href');
      const img = document.createElement('img');
      img.src = imgPath;
      imgContainer.appendChild(img);
      
      //-> We add the image title
      const imgTitle = `<h2 class="cat-title">${name}</h2>`;
      imgContainer.insertAdjacentHTML('afterbegin', imgTitle);
      
      //-> We select the created image and its title
      selectDisplayedImg();
   });
}


//-> Function that clears the "stage" from the previous img and title 
function cleanTheStage() {
   //-> Remove previos title
   const previousTitle = imgContainer.firstElementChild;
   if (previousTitle) {
      imgContainer.removeChild(previousTitle);
   }

   //-> Remove previos img
   const previousImg = document.querySelector('img');
   if (previousImg) {
      previousImg.remove();
   }
} 


//-> Function to select the displayed image and its title 
let showedImg;
let catTitle;
function selectDisplayedImg() {
   showedImg = document.querySelector('img');   
   catTitle = document.querySelector('.cat-title');

   listenForClicksOnImg();
}


//-> Function that adds a click event listener for the cat image
function listenForClicksOnImg() {
   showedImg.addEventListener('click', () => {
      handleCounterOfClicks(catTitle.textContent);
   });   
} 


//-> Object that stores the times an image is clicked 
const counts = { counter1: 0, counter2: 0, counter3: 0, counter4: 0, counter5: 0 };
//-> Funtion that handles the count for each click on a specific image 
function handleCounterOfClicks(imgTitle) {
   //-> Select the elements where the number of clicks will be displayed
   const countsContainer = document.querySelector('#counter-clicks');
   switch (imgTitle) {
      case 'Cat 1': {
         counts.counter1 +=1;
         countsContainer.textContent = counts.counter1;
         break;
      }
         
      case 'Cat 2': {
         counts.counter2 += 1;
         countsContainer.textContent = counts.counter2;
         break;
      }
 
      case 'Cat 3': {
         counts.counter3 += 1;
         countsContainer.textContent = counts.counter3;
         break;
      }
  
      case 'Cat 4': {
         counts.counter4 += 1;
         countsContainer.textContent = counts.counter4;
         break;
      }

      case 'Cat 5': {
         counts.counter5 += 1;
         countsContainer.textContent = counts.counter5;
         break;
      }    
   }
}




