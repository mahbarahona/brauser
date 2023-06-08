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
  nextStep(step) {
    this.next = step;
  }
  process(data) {
    const stepResult = this.execute(data);
    if (this.next) return this.next.process(stepResult);
    return stepResult;
  }
  execute(txt) {
    return this.handle(txt);
  }
  // method to replace
  handle(txt) {
    return txt;
  }
}
