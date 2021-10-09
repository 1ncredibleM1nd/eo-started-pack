import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

function fixPropertyDecorator<T extends Function>(decorator: T): T {
  return ((...args: any[]) =>
    (target: any, propertyName: any, ...decoratorArgs: any[]) => {
      decorator(...args)(target, propertyName, ...decoratorArgs);
      return Object.getOwnPropertyDescriptor(target, propertyName);
    }) as any;
}

export const container = new Container();
const { lazyInject: inject } = getDecorators(container, false);
export const lazyInject = fixPropertyDecorator(inject);
