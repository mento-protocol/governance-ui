export default abstract class NumbersService {
  public static scaleBalance(
    value: bigint,
    decimals: number = 18,
    precision: number = 3,
  ): number {
    return (
      Number(value / BigInt(10 ** (decimals - precision))) / 10 ** precision
    );
  }
}

export const numberSuffixFormat = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
};
