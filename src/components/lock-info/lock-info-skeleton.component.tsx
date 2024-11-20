import React from "react";
import { Card } from "../_shared";
import ValueLoaderSkeleton from "../_shared/value-loader-skeleton/value-loader-skeleton.component";

export const LockInfoSkeleton = () => {
  return (
    <Card className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-20">
      <div className="flex flex-1 flex-wrap items-end justify-between md:flex-nowrap md:items-stretch">
        <InfoItemSkeleton title="MENTO" />
        <InfoItemSkeleton title="veMENTO" />
        <InfoItemSkeleton title="Expires On" />
      </div>
    </Card>
  );
};

const InfoItemSkeleton: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex flex-col gap-4 md:gap-6">
    <div className="font-inter text-base/[24px] font-medium not-italic text-gray-dark">
      {title}
    </div>
    <ValueLoaderSkeleton>000</ValueLoaderSkeleton>
  </div>
);
