export default abstract class StringService {
  public static limitLength(
    value: string,
    length: number,
    ellipsis?: boolean,
  ): string {
    return value.length > length
      ? `${value.substring(0, length)}${ellipsis && "..."}`
      : value;
  }
}
