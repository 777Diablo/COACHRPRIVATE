export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

const menuData: Menu[] = [
  {
    id: 1,
    title: "Pricing",
    path: "/pricing",
    newTab: false,
  },
  {
    id: 2,
    title: "Blogs",
    path: "/blogs",
    newTab: false,
  },

  {
    id: 3,
    title: "About Us",
    path: "/about",
    newTab: false,
  },

  {
    id: 4,
    title: "Contact Us",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "FAQ",
    path: "/faq",
    newTab: false,
  },
];

export default menuData;
