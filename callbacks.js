/*
  Callbacks - the "traditional" way to handle asynchronous functions
  https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
*/

const request = require("request");
const print = require("utils").print;

const url = "https://learning-admin-staging.herokuapp.com/api/v1/en/projects/";

const requestCallback = (error, response, body) => {
  if (error) {
    return print(error);
  }
  const json = JSON.parse(body);
  return print(json);
};

request.get(url, requestCallback);

// Callback hell
request.get(url, (error, response, body) => {
  if (error) {
    return print(error);
  }
  const json = JSON.parse(body);

  const projectSlug = json.data[0].attributes.repositoryName;
  const projectUrl = `${url}${projectSlug}`;

  request.get(projectUrl, (err, _, resBody) => {
    if (err) {
      return print(error);
    }
    const projectJson = JSON.parse(resBody);

    const projectTitle = projectJson.data.attributes.masterContent.en.title;
    return print(projectTitle);
  });
});

// Note: a 404 message from the api is not an `error` in the callback
