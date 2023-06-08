import '../css/global.css';
// eslint-disable-next-line import/no-unresolved
import '../scss/global.scss';

import { fileLoader } from './modules/file-loader';
import { fileParser } from './modules/file-parser';
import { Renderer } from './modules/renderer';
import { appState } from './modules/state';

// events
const whenFileLoaded = async (event) => {
  const fileReference = event.target.files[0];
  try {
    // file loading
    const uiTxt = await fileLoader.getFileAsTxt(fileReference);
    // file parsing
    const uiModel = await fileParser.toUI({
      from: 'txt',
      file: uiTxt
    });
    // update state
    const newUI = {
      ...uiModel,
      ts: Date.now()
    };
    appState.currentUI = newUI;
    appState.history.push(newUI);
    // render
    const currentUI = appState.currentUI.screen;
    const renderer = new Renderer();
    renderer.draw(currentUI);
  } catch (error) {
    console.warn({ message: 'Unable to read file', error });
  }
};

const whenSearch = async (event) => {
  event.preventDefault();
  const q = event.target.search.value;
  //empty query
  if (!q) return;

  const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

  const isUrl = new RegExp(urlPattern).test(q);

  if (isUrl) {
    console.log('got to address', { q });
    console.warn('Not implemented');
  } else {
    console.log('got to our db', { q });
    console.warn('Not implemented');
  }
};

// run
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.querySelector('#file-input');
  fileInput.addEventListener('change', whenFileLoaded);

  const searchForm = document.querySelector('#search-form');
  searchForm.addEventListener('submit', whenSearch);
});
