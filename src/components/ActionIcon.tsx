import { Tooltip } from "react-tooltip";
import {
  Check,
  Eye,
  type LucideIcon,
  Pencil,
  RefreshCw,
  Trash2,
  User2,
  X,
} from "lucide-react";

// import { useAuth } from '@/contexts/AuthContext';
// import { hasAccessToAction } from '@/lib/resourceConfig';
export type Icon = LucideIcon;

export { Trash2 as DeleteIcon };
export { Pencil as EditIcon };
export { Eye as ViewIcon };
export { User2 as UserIcon };

type ToolTipIconProps = {
  name: string;
  action?: string;
  isActionRequired?: boolean;
  icon: Icon;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
};

const ToolTipIcon = (props: ToolTipIconProps) => {
  // const { authPermissions } = useAuth();
  const { action, isActionRequired = false, ...rest } = props;

  if (isActionRequired) {
    // return hasAccessToAction(authPermissions, action) ? (
    //   <>
    //     <props.icon onClick={props.onClick} className={`h-4 w-4 ${props.className} cursor-pointer`} data-tooltip-id={props.name} {...rest} />
    //     {props.tooltip && <Tooltip id={props.name} content={props.tooltip} />}
    //   </>
    // ) : null;
  } else {
    return (
      <>
        <props.icon
          onClick={props.onClick}
          className={`h-4 w-4 ${props.className} cursor-pointer`}
          data-tooltip-id={props.name}
          {...rest}
        />
        {props.tooltip && <Tooltip id={props.name} content={props.tooltip} />}
      </>
    );
  }
};

interface ActionIconProps extends React.ComponentPropsWithoutRef<"button"> {
  name: string;
  action?: string;
  icon?: Icon;
  tooltip?: string;
  isActionRequired?: boolean;
  onClick?: () => void;
}

export const ActionIcon = (props: ActionIconProps) => {
  switch (props.name) {
    case "delete":
      return <ToolTipIcon icon={Trash2} {...props} />;
    case "edit":
      return <ToolTipIcon icon={Pencil} {...props} />;
    case "role":
      return <ToolTipIcon icon={User2} {...props} />;
    case "view":
      return <ToolTipIcon icon={Eye} {...props} />;
    case "user":
      return <ToolTipIcon icon={User2} {...props} />;
    case "refresh":
      return <ToolTipIcon icon={RefreshCw} {...props} />;
    case "approve":
      return <ToolTipIcon icon={Check} {...props} />;
    case "reject":
      return <ToolTipIcon icon={X} {...props} />;

    default:
      return props.icon && <ToolTipIcon icon={props.icon} {...props} />;
  }
};
