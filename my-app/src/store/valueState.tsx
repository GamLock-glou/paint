import { makeAutoObservable } from "mobx";

class valueState {
  count: number = 0;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  increment() {
    this.count += 1;
  }
  decrement() {
    console.log(this.count)
    this.count -= 1;
  }
}
const stateIncDec = new valueState();

export default stateIncDec;
