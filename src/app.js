//-> In the model it is stored only 2 things. A current cat that starts with null
//   which is later changed in octupus. And an array of cat objects.
const model = {
   cubToDisplay: null,
   adminActivated: false,  //-This sets the admin form view to true or false 
   cubs: [
      {
         name: 'Cub 1',
         imgSrc: 'img/realCat1.jpg',
         clickCount: 0
      },
      {
         name: 'Cub 2',
         imgSrc: 'img/realCat2.jpg',
         clickCount: 0
      },
      {
         name: 'Cub 3',
         imgSrc: 'img/realCat3.jpg',
         clickCount: 0
      },
      {
         name: 'Cub 4',
         imgSrc: 'img/realCat4.jpg',
         clickCount: 0
      },
      {
         name: 'Cub 5',
         imgSrc: 'img/realCat5.jpg',
         clickCount: 0
      }
   ]
};


//-> This section is incharge of getting info from Model and communicate it to View
const octopus = {
   // In this function we set the first cub-object to be displayed
   // and also we initialize the 2 views calling their methods.
   init() {
      model.cubToDisplay = model.cubs[0];

      //initialize view1 here
      cubListView.init();
      //initialize view2 here
      cubView.init();
   },

   // This method will get the info/object of the cub to be displayed
   // which we have set up previously, then we will use the data retrieved
   // to RENDER the image of the cub in the DOM.
   getCurrentCubObj() {
      return model.cubToDisplay;
   },

   // We need to get all the cubs so that we can generate a list
   // of names available to the user to click on, this will be used in
   // view2 RENDER method.
   getAllCubs() {
      return model.cubs;
   },

   // After generating our list, we need a method that would set/display
   // the clicked cub to the stage. This method is called inside the event
   // listener located in the view.render method.
   displaySelectedCub(selectedCub) {
      model.cubToDisplay = selectedCub;
   },

   // When the selected cub / diplayed cub in the stage is clicked
   // we need to increment its clickCount property. This is called in the
   // view1
   incrementCounter() {
      model.cubToDisplay.clickCount++;
      // We update the number of clicks in the DOM by callin the view.render()
      cubView.render();
   },
   
   //- This section is for the ADMIN form 
   // NEW: First we need a method that handles whether adminActivated is true or false
   toggleAdminValue() {
      model.adminActivated == false ? model.adminActivated = true : model.adminActivated = false;
      return model.adminActivated; 
   },

   //NEW: with this method we   display the ADMIN form 
   activateAdminMode() {
      cubView.adminRender();
   },
   
   //NEW: This metod updates the name changed of the current cub 
   updateCubInfo(newName) {
      this.getCurrentCubObj().name = newName; 
   }
};


//-> The VIEW part is splitted in 2 parts, the first part is for
//   displaying the selected cub, and the second part is for displaying the names of cubs.
const cubView = {
   // We need a function that grabs all the elements where the information
   // and the picture of the selected cub will be displayed.
   init() {
      this.cubTitleElem = document.querySelector('.cub-title');
      this.cubImgContainer = document.querySelector('#img-receiver');
      this.countContainer = document.querySelector('#counter-clicks');
      
      // NEW-FOR ADMIN: first we select all the elements that will be used  
      this.adminBtn = document.querySelector('#admin-btn');
      this.editForm = document.querySelector('.edit-cub-info');
      this.nameInput = document.querySelector('#name');
      this.urlInput = document.querySelector('#url');
      this.clicksInput = document.querySelector('#clicks-counted');
      this.cancelBtn = document.querySelector('#cancel-btn');
      this.saveBtn = document.querySelector('#save-btn');
		
      // After the selection of the cub img container, we need to add
      // an event listener to it so we can increment the clickCount property
      // from the model each time the displayed cub is clicked.
      this.cubImgContainer.addEventListener('click', () => {
         octopus.incrementCounter();
      });

      // NEW: Event listener for activating the ADMIN view 
      this.adminBtn.addEventListener('click', () => {
         octopus.activateAdminMode();
      });

      // NEW: Event listener for CANCELING the editng 
      this.cancelBtn.addEventListener('click', () => {
         this.disableAdminMode();
      });

      // NEW: Event listener that saves and updates the current Cub 
      this.saveBtn.addEventListener('click', () => {
         const newName = this.nameInput.value;
         octopus.updateCubInfo(newName);
         this.render();
         cubListView.clearCubList();
         cubListView.render();
         this.disableAdminMode();
         alert('Update saved');         
      });
   
      // After incrementing the clickCount we have to update the DOM so we call our
      // render method from this current object.
      this.render();
   },

   // After selecting the elements that will contain the cub's info
   // we need to render actual info in the DOM, for that we need to get the
   // current cub stored in the model when clicked on its name and from there we get the properties to display
   render() {
      const currentCub = octopus.getCurrentCubObj();
      this.cubTitleElem.textContent = currentCub.name;
      this.cubImgContainer.src = currentCub.imgSrc;
      this.countContainer.textContent = currentCub.clickCount;
   },

   // NEW:  This method handles display of the current cub when ADMIN is active  
   adminRender() {
      const formAdminStatus = octopus.toggleAdminValue();
      
      if (formAdminStatus) {
         this.editForm.style.display = 'block';
         const currentCub = octopus.getCurrentCubObj();
         this.nameInput.value = currentCub.name;
         this.urlInput.value = currentCub.imgSrc;
         this.clicksInput.value = currentCub.clickCount;
      }
   },

   // NEW: This method HIDES or disable the FORM of the ADMIN section 
   disableAdminMode() {
      octopus.toggleAdminValue();
      this.editForm.style.display = 'none';
   }


};


//-> This is the VIEW2 which actually should be the View1, this generates the list
//   of cubs that we will have available to click and display its image to the stage.
const cubListView = {
   // First, we need a function that will initialize the list of available cubs.
   // For that we have to grab the element where the names of the cubs are gona be displayed
   // and also we have to call the render() method from this object.
   init() {
      this.listOfCubs = document.querySelector('#list-cubs-container');

      //In the initialization we also have to render the list of cubs
      this.render();
   },

   // This method will render the list of cubs in the DOM, first declaring variables
   // that later are used to store the information about each cub-object with its info
   render() {
      // First we create variables were we are going to store data
      let elem;
      // We have to store our array of cubs objects in a variable to loop through
      let cubs = octopus.getAllCubs();

      // we should empty the listOfCubs from the DOM TODO!! --after project, not necessary


      // Wee need to loop over our array of cubs where a cub will be equal
      // to the current index of the loop. And we create and store an element in our
      // elem variable  which we will add the text content that comes from current cub object' name
      // THEN we add an event listener for each name listed in the DOM wich will render
      // The clicked CUB wich will be the argument for our octupus.displaySelectedCub
      for (const cub of cubs) {
         elem = document.createElement('a');
         elem.textContent = cub.name;

         elem.addEventListener('click', () => {
            octopus.displaySelectedCub(cub);
            cubView.render();
         });

         // In every loop we add an element to the list
         this.listOfCubs.appendChild(elem);
      }
   },

   // NEW: before displaying the updated cub info we need to clear the space
   clearCubList() {
      this.listOfCubs.innerHTML = '';
   }
};

//-> We initialize our octopus to run everything
octopus.init();

//============================================================//
