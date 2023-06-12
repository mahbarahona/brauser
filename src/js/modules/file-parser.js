import { Processor, ProcessorStep } from '../models/processor';

// UI FIle Processing
class Parser_UI_Preprocessing extends ProcessorStep {
  handle(txt) {
    // data validation
    if (!txt) throw new Error('Invalid File');

    // format validation
    const uiObject = JSON.parse(txt);

    // schema validation
    const schemaRules = [
      uiObject.screen !== undefined,
      uiObject.env !== undefined,
      uiObject.metadata !== undefined
    ];
    const validSchema = schemaRules.every((r) => r === true);
    if (!validSchema) {
      console.log({ schemaRules });
      throw new Error('Invalid Schema');
    }
    return uiObject;
  }
}
class Parser_UI_Processing extends ProcessorStep {
  handle(data) {
    // load external resources
    return data;
  }
}
class Parser_UI_Postprocessing extends ProcessorStep {
  handle(data) {
    // sink data
    data.screen.elements = data.screen.elements.map((el) => {
      if (el.position)
        el.position = el.position.split(',').map((coord) => Number(coord));
      return el;
    });
    console.log(data);
    return data;
  }
}

const toUIHandler = {
  txt: (txt) => {
    const TXTToUI = new Processor([
      new Parser_UI_Preprocessing(),
      new Parser_UI_Processing(),
      new Parser_UI_Postprocessing()
    ]);
    return TXTToUI.run(txt);
  },
  xml: (xml) => {
    throw new Error('Not implemented', { data: xml });
  },
  error: ({ from, file }) => {
    throw new Error('Invalid transformation', { data: { from, file } });
  }
};

export const fileParser = {
  toUI: ({ from, file }) => {
    return toUIHandler[from](file) || toUIHandler.error({ from, file });
  }
};
