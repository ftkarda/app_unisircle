import ItemTableRow from "../components/ItemTableRow";
import ItemForm from "../components/ItemForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/actions/itemFunctions";
import { fetchCompanies } from "../store/actions/companyFunctions";
import { setIsLoading } from "../store/actions/actionCreator";

export default function ItemPage() {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.itemReducer);
  const { isError, isLoading } = useSelector((state) => state.indexReducer);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(fetchItems());
    dispatch(fetchCompanies());
  }, []);

  const changeView = () => {
    if (showCreateProduct) {
      setShowCreateProduct(false);
    } else {
      setShowCreateProduct(true);
    }
  };

  if (showCreateProduct) {
    return <ItemForm changeView={changeView}>Create Item</ItemForm>;
  }

  if (isError) {
    return (
      <section className="flex flex-col w-full p-4 px-12 pt-10 md:pt-10 md:px-10 ml-52 mb-10">
        <p className="p-6 text-2xl">Error....</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="flex flex-col w-full p-4 px-12 pt-10 md:pt-10 md:px-10 ml-52 mb-10">
        <p className="p-6 text-2xl">Loading....</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full p-4 px-12 pt-10 md:pt-10 md:px-10 ml-52 mb-10">
      <div className="justify-between flex mb-6 mr-12 ml-6 items-end">
        <h1 className="text-3xl font-semibold">Items List</h1>
        <button
          onClick={changeView}
          className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded text-xs w-fit h-fit"
          type="button"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Create Item
        </button>
      </div>
      <table className="w-full h-fit text-sm text-center text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Main Image
            </th> */}
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return <ItemTableRow key={item.id} data={item}></ItemTableRow>;
          })}
        </tbody>
      </table>
    </section>
  );
}
