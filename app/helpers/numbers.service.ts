const T = 1000000000000;
const B = 1000000000;
const M = 1000000;
const K = 1000;

export default abstract class NumbersService {
    public static parseNumericValue(value: number | string): string {
        if (!value || +value <= 0) {
            return "0";
        }

        if (+value / T >= 1) {
            return `${(+value / B).toFixed(1)}T`;
        }
        if (+value / B >= 1) {
            return `${(+value / B).toFixed(1)}B`;
        }
        if (+value / M >= 1) {
            return `${(+value / M).toFixed(1)}M`;
        }
        if (+value / K >= 1) {
            return `${(+value / K).toFixed(1)}K`;
        }

        return (+value).toFixed(0);
    }
}