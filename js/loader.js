const URL = `https://es.dump.academy/pixel-hunter/questions`;
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
  static loadData() {
    return fetch(URL).
      then(checkStatus).
      then((response) => response.json());
  }
}
