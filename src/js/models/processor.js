export class Processor {
  constructor(steps = []) {
    this.steps = steps;
  }
  addStep(step) {
    this.steps.push(step);
  }
  run(data) {
    let result = data;
    for (const step of this.steps) {
      result = step.process(result);
    }
    return result;
  }
}

export class ProcessorStep {
  process(data) {
    return this.handle(data);
  }
  // method to replace
  handle(txt) {
    return txt;
  }
}
