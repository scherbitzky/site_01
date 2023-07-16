'use strict';
// Show or hide mobile menu
const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (menuIcon && menuBody) {
    menuIcon.addEventListener('click', () => {
        document.body.classList.toggle('_lock');
        menuIcon.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

// Smooth translate to subscribe section
const subscribeLinks = document.querySelectorAll('a[data-goto]');
const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', () => {
            document.body.classList.toggle('_lock');
            menuIcon.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    });
}
if (subscribeLinks.length > 0) {
    subscribeLinks.forEach(subscribeLink => {
        subscribeLink.addEventListener('click', (e) =>{
            const data = e.target.dataset.goto;
            if (data && document.querySelector(data)) {
                const gotoBlock = document.querySelector(data);
                let gotoBlockPosition = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;
                smoothScroll({yPos: gotoBlockPosition, duration: 1000});
                e.preventDefault();
            }
        });
    })
}

// Smooth appearance of sections
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('_show');
        } else {
            change.target.classList.remove('_show');
        }
    });
}
let options = { threshold: [0.01] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('section');
for (let elm of elements) {
    observer.observe(elm);
}

// Feedback swicher
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

// Interval "background-image" change
const historyContainer = document.querySelector('.history__container');
if (historyContainer) {
    function handler() {
        historyContainer.classList.toggle('_bg-alternate');
    }
    setInterval(handler, 5000);
}