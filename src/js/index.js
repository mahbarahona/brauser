import '../css/global.css';
import '../scss/global.scss';

import { fileLoader } from './modules/file-loader';
import { fileParser } from './modules/file-parser';
import { Renderer } from './modules/renderer';
import { appState } from './modules/state';

const initBrowser = async (event) => {
  try {
    // loader
    const fileReference = event.target.files[0];
    const uiTxt = await fileLoader.getFileAsTxt(fileReference);
    // parser
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
    // renderer
    const currentUI = appState.currentUI.screen;
    const engine = document.querySelector('#engine');
    const renderer = new Renderer(engine);
    renderer.draw(currentUI);
  } catch (error) {
    console.warn({ message: 'Unable to read file', error });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.querySelector('#file-input');
  fileInput.addEventListener('change', initBrowser);
});
