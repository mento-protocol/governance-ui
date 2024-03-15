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

export const centerEllipsis = (address: string, remaining = 6) => {
  if (address.length <= remaining * 2) {
    return address;
  }
  return `${address.substring(0, remaining)}...${address.substring(
    address.length - remaining,
  )}`;
};
