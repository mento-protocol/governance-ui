/* eslint-disable @next/next/no-img-element */
import { create } from "ethereum-blockies";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BlockExplorerLink from "@/components/_shared/block-explorer-link/block-explorer-link.component";
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
          src={create({
            // All options are optional
            seed: address, // seed used to generate icon data, default: random
            size: 15, // width/height of the icon in blocks, default: 8
            scale: 3, // width/height of each block in pixels, default: 4
          }).toDataURL()}
          alt={`Avatar for address: ${address}`}
        />
      </BlockExplorerLink>
    </div>
  );
};
