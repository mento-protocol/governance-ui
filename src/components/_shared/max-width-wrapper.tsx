export const MaxWidthWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 md:px-8 xl:px-0">
      {children}
    </div>
  );
};
