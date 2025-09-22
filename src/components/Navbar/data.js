import { Additional_expense } from "@/assets/icons/additonal_icons";
import { Card_icons } from "@/assets/icons/card_icons";
import { Cilents_icons } from "@/assets/icons/cilents_icons";
import { Contacts } from "@/assets/icons/contacts_icnos";
import { Employs_icnos } from "@/assets/icons/employs_icnos";
import { Product_categoriya_icons } from "@/assets/icons/product_categoriya_icons";
import { Reports_icons } from "@/assets/icons/respons_icons";
import { Setings_icons } from "@/assets/icons/setings_icons";

const data = [
  { title: "Reports", path: "/", icon: Reports_icons },
  { title: "Products", path: "/products", icon: Card_icons },
  {
    title: "Products Category",
    path: "/products_category",
    icon: Product_categoriya_icons,
  },
  { title: "Clients", path: "/clients", icon: Cilents_icons },
  { title: "Employees", path: "/employees", icon: Employs_icnos },
  { title: "Contracts", path: "/contracts", icon: Contacts },
  {
    title: "Additional Expense",
    path: "/additional_expense",
    icon: Additional_expense,
  },
  { title: "Settings", path: "/settings", icon: Setings_icons },
];

export { data };
