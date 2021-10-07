export function classnames(...classes: Array<string | boolean | undefined>) {
  return classes.filter((className) => className).join(" ");
}
