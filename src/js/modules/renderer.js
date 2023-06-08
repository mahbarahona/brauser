import { Processor, ProcessorStep } from '../models/processor';

class RendererStep_Layout extends ProcessorStep {
  handle(data) {
    console.log('renderer:layout', data);
    return data;
  }
}
class RendererStep_Painting extends ProcessorStep {
  handle(data) {
    console.log('renderer:painting', data);
    return data;
  }
}
class RendererStep_Composite extends ProcessorStep {
  handle(data) {
    console.log('renderer:composite', data);
    return data;
  }
}

export class Renderer {
  constructor() {}
  draw(elements) {
    const drawProcess = new Processor([
      new RendererStep_Layout(),
      new RendererStep_Painting(),
      new RendererStep_Composite()
    ]);
    return drawProcess.run(elements);
  }
}
