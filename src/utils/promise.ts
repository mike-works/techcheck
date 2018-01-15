type PromiseResolver<T> = (value?: T | PromiseLike<T>) => void;
type PromiseRejector = (reason?: any) => void;

// export class Deferred<T> {
//   private internalResolve: PromiseResolver<T>;
//   private internalReject: PromiseRejector;
//   private internalPromise: Promise<T>;
//   constructor() {
//     this.internalPromise = new Promise<T>((res, rej) => {
//       this.internalResolve = res;
//       this.internalReject = rej;
//     });
//   }
//   public resolve(value?: T | PromiseLike<T>): void {
//     this.internalResolve(value);
//   }
//   public reject(reason?: any): void {
//     this.internalReject(reason);
//   }
//   public get promise(): Promise<T> {
//     return this.internalPromise;
//   }
// }

/**
 * Returns the first value to resolve
 * @param promises Array of promises
 */
export function first<T>(...promises: Promise<T>[]): Promise<T> {
  let numRejected = 0;

  return new Promise((resolve, reject) =>
    promises.forEach(promise =>
      promise.then(resolve).catch(() => {
        if (++numRejected === promises.length) reject();
      })
    )
  );
}

// function timeout(t: number): Promise<number> {
//   return new Promise<number>(res => {
//     setTimeout(() => res(t), t);
//   });
// }
