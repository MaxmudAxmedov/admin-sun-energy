import { Additional_expense } from "@/assets/icons/additonal_icons";
import { Card_icons } from "@/assets/icons/card_icons";
import { Cilents_icons } from "@/assets/icons/cilents_icons";
import { Contacts } from "@/assets/icons/contacts_icnos";
import { Employs_icnos } from "@/assets/icons/employs_icnos";
import { Product_categoriya_icons } from "@/assets/icons/product_categoriya_icons";
import { Reports_icons } from "@/assets/icons/respons_icons";
import { Setings_icons } from "@/assets/icons/setings_icons";

const data = [
  {
    title: "reports",
    path: "/",
    icon: Reports_icons,
  },
  {
    title: "products",
    path: "/products",
    icon: Card_icons,
  },
  {
    title: "products_category",
    path: "/products_category",
    icon: Product_categoriya_icons,
  },
  {
    title: "clients",
    path: "/clients",
    icon: Cilents_icons,
  },
  {
    title: "employees",
    path: "/employees",
    icon: Employs_icnos,
  },
  {
    title: "contracts",
    path: "/contracts",
    icon: Contacts,
  },
  {
    title: "additional_expense",
    path: "/additional_expense",
    icon: Additional_expense,
  },
  {
    title: "settings",
    path: "/settings",
    icon: Setings_icons,
  },
];

export { data };
