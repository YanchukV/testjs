// import PhonesPage from './components/PhonesPage.js';
//
// new PhonesPage(
//   document.querySelector('[data-component="PhonesPage"]')
// );

const API_URL = 'https://mgrinko.github.io/js-20190221/api/phones.json';

const dataPromise = fetch(API_URL);


dataPromise.then((response) => {
  console.log(response);
});
