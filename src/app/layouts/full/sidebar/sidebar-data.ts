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
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'login',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Login',
  //       iconName: 'point',
  //       route: '/authentication/login',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Register',
  //       iconName: 'point',
  //       route: '/authentication/register',
  //     },
  //   ],
  // },

];
