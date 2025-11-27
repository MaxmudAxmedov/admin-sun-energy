import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postProductsMutation } from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductsCreate() {
  const [params, setstatedata] = React.useState(null)
  const { mutate } = useMutation(postProductsMutation(params))
  const [form, setForm] = React.useState({
    name: "",
    count_of_product: "",
    category: "",
    watt: "",
    price: "",
    mark_up: "",
    power_system: "",
    description: "",
    img: null,
  })
  const handalesend = () => {
    const FormDAta = new FormData();
    Object.keys(form).forEach(key => {
      FormDAta.append(key, form[key])
    });
  }

  return (
    <div className="py-2">
      <div className="flex justify-between items-center pr-10 " >
        <h1>{t("create_product")}</h1>
        <Link to="/products" className="py-[7px] px-5 bg-button text-aside rounded-md cursor-pointer ">
          back
        </Link>
      </div>
      <Form>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {" "}
            {t("product_name")}*
            <Input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("Enter_Product_name")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("Count_of_product")}*
            <Input
              onChange={(e) => setForm({ ...form, count_of_product: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("enter_count_of_product")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("pcategory")}*
            <Input
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("pcategory")}
            />
          </label>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {" "}
            {t("watt")}
            <Input
              onChange={(e) => setForm({ ...form, watt: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("watt")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("price")}*
            <Input
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("price")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("mark_up")}
            <Input
              onChange={(e) => setForm({ ...form, mark_up: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("mark_up")}
            />
          </label>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-start gap-4 flex-wrap">
          <label className="text-active pt-3" htmlFor="name">
            {" "}
            {t("power_system")}
            <Input
              onChange={(e) => setForm({ ...form, power_system: e.target.value })}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("power_system")}
            />
          </label>
          <div className="grid w-[400px] gap-2">
            <Label className="text-active" htmlFor="message">
              {t("description")}
            </Label>
            <Textarea
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-[400px] h-[100px] text-active resize-none"
              id="message"
              placeholder={t("description")}
            />
          </div>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-start gap-4 flex-wrap">
          <Input type="file" onChange={(e) => setForm({ ...form, img: e.target.files[0] })} />
          <img
            src={FormData}
            alt="uploaded"
            className="w-full h-[200px] object-cover rounded-md"
          />
        </div>
        <Button className={""} onClick={handalesend}> send</Button>
      </Form>
    </div>
  );
}
