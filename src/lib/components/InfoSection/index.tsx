import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Item } from "./Item";

export const InfoSection = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="flex items-center gap-2 text-[22px] font-bold mb-3">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

InfoSection.Grid = Grid;
InfoSection.Item = Item;
InfoSection.Divider = Divider;
