import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResponsivenessView extends View {
  addHandlerToggleVisibility() {
    const toggleButton = document.querySelector('.show-results-btn');
    const resultsContainer = document.querySelector('.search-results');
    const searchForm = document.querySelector('.search'); // The entire form
    const pagination = document.querySelector('.pagination'); // Pagination section

    if (!resultsContainer || !toggleButton || !searchForm || !pagination)
      return;

    // ✅ Toggle visibility when clicking the button
    toggleButton.addEventListener('click', function (e) {
      resultsContainer.classList.toggle('hidden');
      e.stopPropagation(); // ✅ Prevents the click from reaching `document`
    });

    // ✅ Prevent hiding when clicking inside search, results, or pagination
    [searchForm, resultsContainer, pagination].forEach(element => {
      element.addEventListener('click', function (e) {
        e.stopPropagation(); // ✅ Stops event from reaching `document`
      });
    });

    // ✅ Hide results only when clicking completely outside
    document.addEventListener('click', function () {
      if (window.innerWidth <= 900) {
        resultsContainer.classList.add('hidden');
      }
    });

    // ✅ Hide results only on page load if screen width is ≤900px
    if (window.innerWidth <= 900) {
      resultsContainer.classList.add('hidden');
    }

    // ✅ Do NOT force-hide results when resizing—only show them on large screens
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        resultsContainer.classList.remove('hidden'); // Show results on desktop
      }
    });
  }

  addHandlerNavHamburger() {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    // Toggle menu when clicking the hamburger button
    navToggle.addEventListener('click', function (e) {
      navList.classList.toggle('active');
      e.stopPropagation(); // Prevent immediate closing
    });

    // Hide menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
        navList.classList.remove('active');
      }
    });

    // Show nav when resizing to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        navList.classList.remove('active');
      }
    });
  }
}

export default new ResponsivenessView();
