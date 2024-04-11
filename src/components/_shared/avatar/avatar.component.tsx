/* eslint-disable @next/next/no-img-element */
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { BlockExplorerLink } from "@/components/_shared";
import { blo, Address } from "blo";

interface AvatarProps extends BaseComponentProps {
  address: string;
}

export const Avatar = ({ className, address }: AvatarProps) => {
  return (
    <div
      // TODO: border radius is 50%
      className={`h-[35px] w-[35px] rounded-full ${className}`}
    >
      <BlockExplorerLink type="address" item={address}>
        <img
          src={blo(address as Address)}
          alt={`Avatar for address: ${address}`}
        />
      </BlockExplorerLink>
    </div>
  );
};
