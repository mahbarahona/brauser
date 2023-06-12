import { Processor, ProcessorStep } from '../models/processor';

class RendererStep_Layout extends ProcessorStep {
  handle(data) {
    console.log('renderer:layout', data);
    // calc sizes
    data.elements = data.elements.map((el) => new UIControl({ el }));
    return data;
  }
}
class RendererStep_Painting extends ProcessorStep {
  // eslint-disable-next-line constructor-super
  constructor(engine, context) {
    super();
    this.engine = engine;
    this.ctx = context;
  }
  handle(ui) {
    console.log('renderer:painting', ui);
    // draw elements
    this.ctx.fillStyle = '#ccc';
    this.ctx.fillRect(0, 0, ui.width, ui.height);
    ui.elements.forEach((el) => el.draw(this.ctx));
    return ui;
  }
}
class RendererStep_Composite extends ProcessorStep {
  handle(data) {
    console.log('renderer:composite', data);
    // merge and output image
    return data;
  }
}

export class Renderer {
  constructor(engine) {
    if (!engine) throw new Error('engine not available');
    this.engine = engine;
    //
    this.engine.width = 300;
    this.engine.height = 400;
    //
    this.ctx = this.engine.getContext('2d');
    this.drawProcess = new Processor([
      new RendererStep_Layout(),
      new RendererStep_Painting(this.engine, this.ctx),
      new RendererStep_Composite()
    ]);
  }
  draw(elements) {
    return this.drawProcess.run(elements);
  }
}
const canvasHelper = {
  text: ({ ctx, config }) => {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(10, 10, 50, 50);
    ctx.stroke();
  },
  arc: ({ ctx, config }) => {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(100, 100, 50, 50);
    ctx.fill();
    ctx.stroke();
  },
  dot: ({ ctx, config }) => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(150, 150, 50, 50);
    ctx.fill();
    ctx.stroke();
  },
  rect: ({ ctx, config }) => {
    ctx.beginPath();
    ctx.fillStyle = 'purple';
    ctx.rect(200, 200, 50, 50);
    ctx.fill();
    ctx.stroke();
  },
  polygon: ({ ctx, config }) => {
    ctx.beginPath();
    ctx.fillStyle = 'fucsia';
    ctx.rect(10, 300, 50, 50);
    ctx.fill();
    ctx.stroke();
  },
  line({ ctx, config }) {
    const { from, to } = {
      from: { x: 10, y: 20 },
      to: { x: 50, y: 50 }
    };
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }
};
class UIControl {
  constructor({ el, config }) {
    this.el = el;
    this.config = config;
    this.el.type = this.el.type.toLowerCase();
  }
  draw(context) {
    try {
      // switch abreviado para dibujar la forma segun el type
      canvasHelper[this.el.type]({ ctx: context, config: this.config });
    } catch (error) {
      console.log({ error });
    }
  }
}
