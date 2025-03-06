const createOdometer = (el, value) => {
    const odometer = new Odometer({
      el: el,
      value: 0,
    });
  
    let hasRun = false;
  
    const options = {
      threshold: [0, 0.9],
    };
  
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasRun) {
            odometer.update(value);
            hasRun = true;
          }
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  };
  
  const subscribersOdometer = document.querySelector(".subscribers-odometer");
  createOdometer(subscribersOdometer, 20);
  
  const videosOdometer = document.querySelector(".videos-odometer");
  createOdometer(videosOdometer, 150);
  
  const projectsOdometer = document.querySelector(".projects-odometer");
  createOdometer(projectsOdometer, 5);

  window.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.querySelector('#filter-container');
    const galleryContainer = document.querySelector('#gallery-container');
  
    const filterImages = (event) => {
      document.querySelectorAll('.filter-element').forEach((element) => {
        element.classList.remove('filter-active');
      });
      event.target.classList.add('filter-active');
  
      document.querySelectorAll('.gallery-image').forEach((element) => {
        if (
          (event.target.id !== element.dataset.category) &
          (event.target.id !== 'all')
        ) {
          element.classList.add('hide-image');
        } else {
          element.classList.remove('hide-image');
        }
      });
    };
  
    categories.forEach((element) => {
      const domElement = document.createElement('span');
      domElement.innerText = element.name;
      domElement.classList.add('filter-element');
      if (element.filter === 'all') {
        domElement.classList.add('filter-active');
      }
      domElement.id = element.filter;
      domElement.addEventListener('click', filterImages);
  
      filterContainer.appendChild(domElement);
    });
  
    images.forEach((element) => {
      const domElement = document.createElement('img');
      domElement.src = `images/${element.url}`;
      domElement.alt = element.title;
      domElement.dataset.category = element.category;
      domElement.classList.add('gallery-image');
  
      galleryContainer.appendChild(domElement);
    });
  });
  