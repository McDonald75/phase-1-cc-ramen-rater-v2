// Base URL for API
const baseURL = 'http://localhost:3000';

// Callbacks
const handleClick = (ramen) => {
  // This function handles what happens when a ramen image is clicked
  const ramenDetail = document.querySelector('#ramen-detail');
  const ramenName = document.querySelector('#ramen-name');
  const ramenRestaurant = document.querySelector('#ramen-restaurant');
  const ramenImage = document.querySelector('#ramen-detail-image');
  const ramenRating = document.querySelector('#ramen-rating');
  const ramenComment = document.querySelector('#ramen-comment');

  // Update the ramen details in the DOM
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ramenImage.src = ramen.image;
  ramenRating.textContent = `Rating: ${ramen.rating}`;
  ramenComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add a submit listener to the ramen form
  const form = document.querySelector('#new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target['name'].value,
      restaurant: event.target['restaurant'].value,
      image: event.target['image'].value,
      rating: event.target['rating'].value,
      comment: event.target['comment'].value,
    };

    fetch(`${baseURL}/ramens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then(response => response.json())
      .then(addedRamen => displayRamenImage(addedRamen));

    // Clear the form
    form.reset();
  });
};

const displayRamens = () => {
  // Fetch ramens and display them on the page
  fetch(`${baseURL}/ramens`)
    .then((response) => response.json())
    .then((data) => {
      const ramens = data.ramens;
      const ramenMenu = document.querySelector('#ramen-menu');

      // Clear any existing ramen images (if needed)
      ramenMenu.innerHTML = '';

      // Display each ramen image in the ramen menu
      ramens.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;

        // Attach a click event listener to handle displaying details
        img.addEventListener('click', () => handleClick(ramen));

        // Append the image to the menu
        ramenMenu.appendChild(img);
      });

      // Automatically display details for the first ramen in the list
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch((error) => {
      console.error('Error fetching ramens:', error);
    });
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();

  // Invoke addSubmitListener here
  addSubmitListener();
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
