'use strict';
// mobile menu
const menuIcon = document.querySelector('.menu__icon');
if (menuIcon) {
    const menuBody = document.querySelector('.menu__body');
    if (menuBody) {
        menuIcon.addEventListener('click', () => {
            document.body.classList.toggle('_lock');
            menuIcon.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }
}

// smooth appearance of sections
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('_show');
        } else {
            change.target.classList.remove('_show');
        }
    });
}
let options = { threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('section');
for (let elm of elements) {
    observer.observe(elm);
}

// feedback swicher
const btnNext = document.querySelector('.flipping__next');
const btnBack = document.querySelector('.flipping__back');
const feedbackItems = document.querySelectorAll('.testimonials__feedback');
const profileItems = document.querySelectorAll('.person-profile');
if (feedbackItems.length !== 0) {
    feedbackItems[0].classList.remove('_hidden');
    feedbackItems[0].classList.add('_shown');
    profileItems[0].classList.remove('_hidden');
    profileItems[0].classList.add('_shown');
}
if (btnNext && btnBack) {
    let currentItem = 0;
    let feedbackLength = feedbackItems.length;
    function toggleClass() {
        feedbackItems[currentItem].classList.toggle('_shown');
        feedbackItems[currentItem].classList.toggle('_hidden');
        profileItems[currentItem].classList.toggle('_shown');
        profileItems[currentItem].classList.toggle('_hidden');
    }
    btnNext.addEventListener('click', () => {
        if (currentItem !== feedbackLength - 1) {
            toggleClass();
            ++currentItem;
            toggleClass();
        } else if (currentItem == feedbackLength - 1) {
            toggleClass();
            currentItem = 0;
            toggleClass();
        }
    });
    btnBack.addEventListener('click', () => {
        if (currentItem !== 0) {
            toggleClass();
            --currentItem;
            toggleClass();
        } else if (currentItem == 0) {
            toggleClass();
            currentItem = feedbackLength - 1;
            toggleClass();
        }
    });
}