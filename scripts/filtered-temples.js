// Copyright year and last modified
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modification: ${lastModified}`;

// Menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburgerBtn.contains(event.target);
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Temple data
  const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
      templeName: "Salt Lake Utah",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 253015,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-62982.jpg"
    },
    {
      templeName: "Rome Italy",
      location: "Rome, Italy",
      dedicated: "2019, March, 10",
      area: 41000,
      imageUrl:
        "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/1280%2C/0/default"
    },
    {
      templeName: "Tokyo Japan",
      location: "Tokyo, Japan",
      dedicated: "1980, October, 27",
      area: 53997,
      imageUrl:
        "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/1280%2C/0/default"
    },
    {
      templeName: "Paris France",
      location: "Le Chesnay, France",
      dedicated: "2017, May, 21",
      area: 44175,
      imageUrl:
        "https://www.churchofjesuschrist.org/imgs/5ec026c4efeaaa19a98e40f0f1b4c6069ae63517/full/1280%2C/0/default"
    }
  ];

  // Rendering
  const grid = document.getElementById('temple-grid');

  function createTempleCard(temple) {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy';
    figure.appendChild(img);

    const caption = document.createElement('figcaption');
    const name = document.createElement('h3');
    name.textContent = temple.templeName;
    caption.appendChild(name);

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
    caption.appendChild(location);

    const dedicated = document.createElement('p');
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
    caption.appendChild(dedicated);

    const area = document.createElement('p');
    area.innerHTML = `<strong>Area:</strong> ${Number(temple.area).toLocaleString()} sq ft`;
    caption.appendChild(area);

    figure.appendChild(caption);
    return figure;
  }

  function renderTemples(list) {
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach(t => grid.appendChild(createTempleCard(t)));
  }

  function getYear(temple) {
    const yearPart = typeof temple.dedicated === 'string' ? temple.dedicated.split(',')[0] : '';
    const year = parseInt(yearPart, 10);
    return isNaN(year) ? null : year;
  }

  function filterTemples(filter) {
    let filtered = temples;
    switch (filter) {
      case 'old':
        filtered = temples.filter(t => {
          const y = getYear(t);
          return y !== null && y < 1900;
        });
        break;
      case 'new':
        filtered = temples.filter(t => {
          const y = getYear(t);
          return y !== null && y > 2000;
        });
        break;
      case 'large':
        filtered = temples.filter(t => Number(t.area) > 90000);
        break;
      case 'small':
        filtered = temples.filter(t => Number(t.area) < 10000);
        break;
      case 'home':
      default:
        filtered = temples;
        break;
    }
    renderTemples(filtered);
  }

  // Initial render
  renderTemples(temples);

  // Nav filtering
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      e.preventDefault();
      const key = link.textContent.trim().toLowerCase();
      switch (key) {
        case 'old':
          filterTemples('old');
          break;
        case 'new':
          filterTemples('new');
          break;
        case 'large':
          filterTemples('large');
          break;
        case 'small':
          filterTemples('small');
          break;
        case 'home':
        default:
          filterTemples('home');
      }
      // close mobile menu after selection
      hamburgerBtn?.classList.remove('active');
      navMenu.classList.remove('active');
    });
  }
});