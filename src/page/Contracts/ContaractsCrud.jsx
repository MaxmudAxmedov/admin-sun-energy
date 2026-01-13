import React, { useMemo } from "react";
import ContractSelect from "@/components/contacts/ContractSelect";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/Table/DataTable";
import Search from "@/components/Search/search";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductQuery, getProductsQuery, postTradesMutation } from "@/queries";
import { t } from "@/utils/i18n";
import { formator } from "@/schemas/formator";
import defaultImg from "@/assets/img/optional-img.jpg";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import { Button } from "@/components/ui/button";
import {
  addProduct,
  decrement,
  increment,
  kv,
} from "@/config/store/product-reduser/product-reduser";
import { Link } from "react-router-dom";

export default function ContaractsCrud() {
  const [countstate, setcountstate] = React.useState(null);
  const dispatch = useDispatch();
  const kvtlist = useSelector((state) => state.Attractor.kvtlist);
  const [ollSum, setollSum] = React.useState();
  const cart = useSelector((state) => state.Attractor.productList);

  React.useEffect(() => {
    const sum = kvtlist.OllkvtPrise;
    const res = countstate;
    const result = sum + res;
    setollSum(result);
  }, [kvtlist, countstate]);

  const [dataid, setdataid] = React.useState("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [params, setParams] = React.useState({
    limit: "200",
    page: "1",
    search: "",
  });
  const { data: d } = useQuery(getProductQuery(params)); /// product categoriy
  const categories = useMemo(
    () => d?.data?.Data?.product_categories || [],
    [d]
  );

  //// Products data

  const { data: Products } = useQuery(getProductsQuery(params));
  const product = useMemo(
    () => Products?.data?.Data?.products || [],
    [Products]
  );

  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    if (!dataid) {
      setFilteredProducts([]);
      return;
    }

    const results =
      product?.filter((item) => item.category_id === dataid) || [];
    setFilteredProducts(results);
  }, [dataid, product]);


  const tableData = useMemo(() => {
    return filteredProducts.map((p) => {
      const cartItem = cart.find((c) => c.id === p.id);
      return {
        ...p,
        count: cartItem?.count || 0,
        total_amount: cartItem?.total_amount || 0,
      };
    });
  }, [filteredProducts, cart]);

  const totalCartAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.total_amount || 0), 0);
  }, [cart]);

  React.useEffect(() => {
    setcountstate(totalCartAmount);
  }, [totalCartAmount]);


   const Mutation = useMutation((params)=>postTradesMutation(params))

     const Submit = (data) => {
      const formData = new FormData()
//         const {
//   accessory_cost,
//   client_id,
//   do_calculate,
//   employee_id,
//   is_company,
//   kvat,
//   order_items [
//     {
//       price: 0,
//       product_id,
//       quantity,
//       selling_price,
//       total_price
//     }
//   ],
//   referred_by,
//   service_cost,
//   total_price,
// },
    reset();
  };





  const columns = [
    {
      key: "index",
      label: "№",
      render: (_, __, index) => index + 1,
    },
    {
      key: "photo",
      label: "Photo",
      render: (value) => (
        <img
          src={forceConvertDomain(value) || defaultImg || "/no-image.png"}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { key: "name", label: t("product_name") },
    {
      key: "description",
      label: t("description"),
      render: (value) => {
        return <div className="w-[200px] line-clamp-3">{value}</div>;
      },
    },
    {
      key: "count_of_product",
      label: t("Count_of_product"),
      render: (_value, row) => {
        const available = row.count_of_product ?? 0;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{row.count}</span>
            <span className="text-sm text-gray-500">/{available}</span>
          </div>
        );
      },
    },
    {
      key: "selling_price",
      label: t("selling_price"),
    },
    {
      key: "total_amount",
      label: t("total_amount"),
      render: (_value, row) => {
        return row.total_amount || "-";
      },
    },

    {
      key: "action",
      label: t("Qo‘shish"),
      render: (_value, row) => {
        const available = row.count_of_product ?? 0;
        const isOut = available <= 0;
        const reachedMax = row.count >= available;

        if (!row.total_amount || row.total_amount === 0) {
          return (
            <Button
              type="button"
              className={`w-[140px] h-10 rounded-xl ${
                isOut ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => dispatch(addProduct(row))}
              disabled={isOut}
            >
              {isOut ? t("out_of_stock") || "Out" : "Add"}
            </Button>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <Button
              type="button"
              className="w-10 h-10 bg-red text-[#fff] border-none"
              onClick={() => dispatch(decrement(row))}
            >
              -
            </Button>

            <div className="w-10 h-10 flex items-center justify-center border rounded-md text-black">
              {row.count}
            </div>

            <Button
              type="button"
              className={`w-10 h-10 bg-black text-white border-none ${
                reachedMax ? "opacity-50 cursor-not-allowed bg-gray-400" : ""
              }`}
              onClick={() => dispatch(increment(row))}
              disabled={reachedMax}
            >
              +
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="pl-35 max-w-[1200px] mt-4">
      <form onSubmit={handleSubmit(Submit)}>
        <div className="flex  items-center justify-between">
          <h2>
            {t("clients")} <br />
          </h2>
          <div className="flex gap-4">
            <Link
              to="/Contracts"
              className="px-6 py-2.5 text-[#fff] font-medium border border-red rounded-lg  bg-red"
            >
              Back
            </Link>

            <button
              type="button"
              className="px-6 py-2.5 bg-black border-none text-white font-medium rounded-lg  shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
        <ContractSelect register={register} />
        <div className="max-w-[800px] flex items-center gap-10 my-5">
          <Input
            type={"number"}
            {...register("kvat", {
              onChange: (e) => {
                const val = e.target.value;
                dispatch(kv({ kvt: val }));
              },
            })}
            className="w-[250px]"
            label={"kvt"}
          />
          <Input
            type={"number"}
            {...register("accessory_cost", {
              onChange: (e) => {
                const val = e.target.value;
                dispatch(kv({ acc: val }));
              },
            })}
            className="w-[250px]"
            label={"Accessory cost"}
            value={kvtlist.acc}
          />
          <Input
            type={"number"}
            {...register("service_cost", {
              onChange: (e) => {
                const val = e.target.value;
                dispatch(kv({ cost: val }));
              },
            })}
            className="w-[250px]"
            label={"Service cost"}
            value={kvtlist.cost}
          />
        </div>
        <div>
          <div className="w-[1200px]">
            <div className="w-full flex items-center  gap-10 py-5  ">
              <div className="min-w-[200px]">
                <Search />
              </div>
              <label>
                <select
                  {...register("name", {
                    onChange: (e) => {
                      const res = e.target.value;
                      setdataid(res);
                    },
                  })}
                  className="w-[250px] h-11 rounded-xl 
               border border-gray-300 
               bg-white px-4 text-sm text-black
               shadow-sm transition-all duration-200
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  {categories.map((item) => (
                    <option
                      className="overflow-hidden"
                      key={item.id}
                      value={item.id}
                    >
                      {item?.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="felx flex items-center gap-[30px] ">
                <div className="flex flex-col  items-center ">
                  <h5 className="pl-2 w-[80px]">{t("acc")}</h5>
                  <p>{formator(kvtlist.OllkvtPrise)}</p>
                </div>
                <div className="flex flex-col items-center ">
                  <h5 className="w-[80px]">{t("products")}</h5>
                  <p>{countstate || 0}</p>
                </div>
                <div className="flex flex-col items-center ">
                  <h5 className="w-[100px]">{t("total_amount")}</h5>
                  <p>{ollSum || 0}</p>
                </div>
              </div>
            </div>
          </div>
          <DataTable columns={columns} data={tableData} />
        </div>
      </form>
    </div>
  );
}
