const T = 1000000000000;
const B = 1000000000;
const M = 1000000;
const K = 1000;

export default abstract class NumbersService {
    public static parseNumericValue(value: number | string, precision: number = 1): string {
        if (!value || +value <= 0) {
            return "0";
        }

        if (+value / T >= 1) {
            return `${(+value / T).toFixed((+value / T) % 1 ? precision : 0)}T`;
        }
        if (+value / B >= 1) {
            return `${(+value / B).toFixed((+value / B) % 1 ? precision : 0)}B`;
        }
        if (+value / M >= 1) {
            return `${(+value / M).toFixed((+value / M) % 1 ? precision : 0)}M`;
        }
        if (+value / K >= 1) {
            return `${(+value / K).toFixed((+value / K) % 1 ? precision : 0)}K`;
        }

        return (+value).toFixed(0);
    }
}
