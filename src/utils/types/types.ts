import { TypeForm } from '../enum/enum';

export type RouteData = {
  route: string;
  name?: string;
  isGuest?: boolean;
  component: JSX.Element;
  hideInListNav?: boolean;
};
export type DataNavLink = {
  isActive: boolean;
};

export type HandlerSelectForm = (type: TypeForm) => void;
export type SetTimeout = ReturnType<typeof setTimeout> | null;