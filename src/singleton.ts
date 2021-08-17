export const SINGLETON_KEY = Symbol();

export type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export const singleton = <T extends new (...args: any[]) => any>(
  constructor: T
) =>
  new Proxy(constructor, {
    construct(target: Singleton<T>, args, newTarget) {
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, args, newTarget);
      }

      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, args, newTarget);
      }

      return target[SINGLETON_KEY];
    },
  });
