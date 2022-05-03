import ItemForm from "../components/ItemForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemById } from "../store/actions/itemFunctions";
import { fetchCompanies } from "../store/actions/companyFunctions";
import { setIsLoading } from "../store/actions/actionCreator";

export default function ProductEditPage() {
  const item = useSelector((state) => state.itemReducer.item);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.indexReducer);

  useEffect(() => {
    dispatch(setIsLoading(true));
    window.scrollTo(0, 0);
    dispatch(fetchItemById(id));
    dispatch(fetchCompanies());
  }, []);

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

  return <ItemForm data={item}>Edit Item</ItemForm>;
}
