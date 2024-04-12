document.addEventListener('DOMContentLoaded', (event) => {
  let isAnyBoxOpened = false; 
  let openedPresent = null; 
  let openedGiftsCount = 0; // Add a counter for opened gifts

  class Present {
    constructor(containerElement, presentSrc) {
      this.containerElement = containerElement;
      this.presentSrc = presentSrc;
      this.image = document.createElement('img');
      this.image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png';
      this.image.addEventListener('click', this.openPresent.bind(this));
      this.containerElement.append(this.image);
    } 
    closePresent() {
      this.image.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/gift-icon.png';
      this.image.classList.remove('open-present');
    }
    
    openPresent() {
      if (!isAnyBoxOpened && openedGiftsCount < 2) {
        this.image.src = this.presentSrc;
        this.image.classList.add('open-present'); // Add animation class
        isAnyBoxOpened = true; // Set the flag to true as a box has been opened
        openedPresent = this; // Store the opened present
        openedGiftsCount++; // Increase the counter for opened gifts
  
        // If two gifts have been opened, display the "rechoose" button
        if (openedGiftsCount === 2) {
          document.getElementById('rechooseButton').style.display = 'block';
        }
      }
    
    }

  }

  class App {
    constructor(presentContainer, titleContainer, rechooseButton) {
      this.presentContainer = document.querySelector(presentContainer);
      this.titleContainer = document.querySelector(titleContainer);
      this.rechooseButton = document.getElementById(rechooseButton);
      
      this.presents = [];
      this._fillPresentContainer();
      
      // Bind event listeners.
      this._rechoosePresent = this._rechoosePresent.bind(this);
      
      // Add event listener to the buttons.
      this.rechooseButton.addEventListener('click', this._rechoosePresent);
    } 
    
    _fillPresentContainer() {
      // Shuffle the PRESENT_SOURCES array
      const shuffledSources = this._shuffleArray(PRESENT_SOURCES);
      
      for (const source of shuffledSources) {
        const present = new Present(this.presentContainer, source);
        this.presents.push(present);
      }
    }

    _shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    _rechoosePresent() {
      if (isAnyBoxOpened) {
        isAnyBoxOpened = false; // Reset the flag to allow another box to be opened
      openedPresent = null; // Reset the opened present}
      }
      
  }}

  const PRESENT_SOURCES = [
    'https://media.giphy.com/media/27ppQUOxe7KlG/giphy.gif',
    'https://media.giphy.com/media/LEcRaYyUptIxG/giphy.gif',
    'https://media.giphy.com/media/3BBv1D4AFbJkY/giphy.gif',
    'https://media.giphy.com/media/13smkcXZiTLDgc/giphy.gif',
    'https://media.giphy.com/media/GknfGjiYhsFQk/giphy.gif'
  ];

  const app = new App('#presents', '#title', 'rechooseButton');
});