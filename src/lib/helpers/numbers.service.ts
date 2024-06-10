import { formatUnits } from "viem";

export const TRILLION = 1000000000000000;
export const BILLION = 1000000000;
export const MILLION = 1000000;
export const THOUSAND = 1000;

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

  public static parseNumericValue(
    value: number | string,
    precision: number = 1,
  ): string {
    if (!value || +value <= 0) {
      return "0";
    }

    if (+value / TRILLION >= 1) {
      return `${(+value / TRILLION).toFixed((+value / TRILLION) % 1 ? precision : 0)}T`;
    }
    if (+value / BILLION >= 1) {
      return `${(+value / BILLION).toFixed((+value / BILLION) % 1 ? precision : 0)}B`;
    }
    if (+value / MILLION >= 1) {
      return `${(+value / MILLION).toFixed((+value / MILLION) % 1 ? precision : 0)}M`;
    }
    if (+value / THOUSAND >= 1) {
      return `${(+value / THOUSAND).toFixed((+value / THOUSAND) % 1 ? precision : 0)}K`;
    }

    return (+value).toFixed(0);
  }
}

export const formatUnitsWithRadix = (
  value: bigint,
  decimals: number,
  radix: number,
) => parseFloat(formatUnits(value, decimals)).toFixed(radix);
