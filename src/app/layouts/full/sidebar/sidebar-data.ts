import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Meetings',
  },
  {
    displayName: 'Meeting List',
    iconName: 'calendar',
    route: '/meetings',
  },
  {
    displayName: 'Add Meeting',
    iconName: 'plus',
    route: '/add-meeting',
  },
];
