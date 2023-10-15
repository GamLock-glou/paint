export {};

declare global {
  interface Array<T> {
    sum(): T;
  }
}