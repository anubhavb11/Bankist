'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollto = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollto.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e);
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behaviour: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////Scrolling smooth //////////////////

///////OLD method/////////////

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   console.log(el);

//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

///////using eevnt di=elegation power of bubble in eevnrt propagation///////////////

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// console.log(document.querySelectorAll('.operations__tab'));

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const collect = e.currentTarget.children;
    for (let i = 0; i < collect.length; i++) {
      // console.log(collect[i]);
      if (collect[i].classList.contains('operations__tab--active')) {
        collect[i].classList.remove('operations__tab--active');
      }
    }
    if (e.target.classList.contains('operations__tab')) {
      e.target.classList.add('operations__tab--active');
      const content = document.querySelectorAll('.operations__content ');
      // console.log(content);

      // we can use data set given in html to make code DRY
      content.forEach(function (i) {
        // console.log(i);
        i.classList.remove('operations__content--active');

        if (
          e.target.classList.contains('operations__tab--1') &&
          i.classList.contains('operations__content--1')
        ) {
          // console.log(i);
          i.classList.add('operations__content--active');
        }

        if (
          e.target.classList.contains('operations__tab--2') &&
          i.classList.contains('operations__content--2')
        ) {
          // console.log(i);
          i.classList.add('operations__content--active');
        }

        if (
          e.target.classList.contains('operations__tab--3') &&
          i.classList.contains('operations__content--3')
        ) {
          // console.log(i);
          i.classList.add('operations__content--active');
        }
      });
    }

    //.forEach(function (i) {
    //   console.log(i);
    // });
  });

const nav = document.querySelector('.nav');

const fn = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const sibling = e.target.closest('.nav').querySelectorAll('.nav__link');

    const logo = e.target.closest('.nav').querySelector('img');

    sibling.forEach(function (el) {
      if (el !== e.target) {
        el.style.opacity = opacity;
      }
    });

    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', function (e) {
  // console.log(e.target);
  fn(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  fn(e, 1);
});

// const scrollpos = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > scrollpos.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    // console.log(entry.isIntersecting);
    if (!entry.isIntersecting) {
      // console.log('dsa');
      nav.classList.add('sticky');
    } else {
      // console.log('wew');
      nav.classList.remove('sticky');
    }

    // console.log(x.isInsersecting);
  });
  // const [x] = entries;
  // console.log(x);
  // console.log(x.isInsersecting);
};

const obsOptions = {
  root: null,
  threshold: [0, 1],
  rootMargin: '-90px',
};
const observer = new IntersectionObserver(obsCallback, obsOptions);

const header = document.querySelector('.header');

observer.observe(header);

////////////////////////////////SLIDER////////////////////////////////

const slider = document.querySelector('.slider');

const slide = document.querySelectorAll('.slide');

const slideLeft = document.querySelector('.slider__btn--left');
const slideRight = document.querySelector('.slider__btn--right');

const maxlenslide = slide.length;
// console.log(slider);
// slider.style.transform = 'scale(0.4) translateX(-120px)';

// slider.style.overflow = 'visible';

// console.log(slide);
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slide.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide ="${slide}"]`)
    .classList.add('dots__dot--active');
};

slide.forEach(function (s, i) {
  s.style.transform = `translateX(${i * 100}%)`;
  // console.log(s);
});
activeDot(0);

let currslide = 0;
slideRight.addEventListener('click', function () {
  if (currslide === maxlenslide - 1) {
    currslide = 0;
  } else {
    currslide++;
  }
  slide.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - currslide)}%)`;
    // console.log(s);
  });
  activeDot(currslide);
});

slideLeft.addEventListener('click', function () {
  if (currslide < 1) {
    currslide = maxlenslide - 1;
  } else {
    currslide--;
  }
  slide.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - currslide)}%)`;
    // console.log(s);
  });
  activeDot(currslide);
});

document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'ArrowRight') {
    // console.log('ds');
    // slideRight.addEventListener('click', function () {
    if (currslide === maxlenslide - 1) {
      currslide = 0;
    } else {
      currslide++;
    }
    slide.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - currslide)}%)`;
      // console.log(s);
    });
    activeDot(currslide);
  }

  if (e.key === 'ArrowLeft') {
    if (currslide < 1) {
      currslide = maxlenslide - 1;
    } else {
      currslide--;
    }
    slide.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - currslide)}%)`;
      // console.log(s);
    });
    activeDot(currslide);
  }
});

dotContainer.addEventListener('click', function (e) {
  const pos = e.target.dataset.slide;
  // console.log(e.target.dataset.slide);
  console.log(pos);
  slide.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - pos)}%)`;
    // console.log(s);
  });
  activeDot(pos);
});
