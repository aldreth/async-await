/* eslint-disable no-console */
/*
  Promises
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  https://medium.com/dailyjs/asynchronous-adventures-in-javascript-promises-1e0da27a3b4
  http://api.jquery.com/category/deferred-object/ 2011
  https://github.com/tj/co first commit 2013
  https://github.com/petkaantonov/bluebird first commit 2013
*/

const fetch = require("node-fetch");
const print = require("./utils").print;

const url = "https://learning-admin-staging.herokuapp.com/api/v1/en/projects/";

// fetch(url).then(response => response.json()).then(json => print(json)).catch(error => print(error));
fetch(url)
  .then(response => response.json())
  .then(json => print(json));

// With error handling
// fetch(url).then(response => response.json()).then(json => print(json)).catch(error => print(error));
fetch(url)
  .then(response => response.json())
  .then(json => print(json))
  .catch(error => print(error));

// fetch(url+'1').then(response => response.json()).then(json => {
//   const projectSlug = json.data[0].attributes.repositoryName;
//   const projectUrl = `${url}${projectSlug}`;
//   fetch(projectUrl).then(response => response.json()).then(json => {
//     const projectTitle = json.data.attributes.masterContent.en.title;
//     print(projectTitle);
//   });
// }).catch(error => print(error));

fetch(url)
  .then(response => response.json())
  .then(json => {
    const projectSlug = json.data[0].attributes.repositoryName;
    const projectUrl = `${url}${projectSlug}`;
    fetch(projectUrl)
      .then(response => response.json())
      .then(json => {
        const projectTitle = json.data.attributes.masterContent.en.title;
        print(projectTitle);
      });
  })
  .catch(error => print(error));
