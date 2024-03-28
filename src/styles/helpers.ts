export const prefixStyles = (styles: string, prefix: string) =>
  styles
    .split(" ")
    .map((style) => `${prefix}${style}`)
    .join(" ");
