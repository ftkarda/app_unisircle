import { useDispatch } from "react-redux";
import { deleteProductById, fetchItems } from "../store/actions/itemFunctions";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ItemTableRow({ data }) {
  // const [rupiahPrice, setRupiahPrice] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (data) {
  //     const formattedPrice = new Intl.NumberFormat("id-ID", {
  //       style: "currency",
  //       currency: "IDR",
  //       minimumFractionDigits: 0,
  //     }).format(data.price);
  //     setRupiahPrice(formattedPrice);
  //   }
  // }, [data]);

  const deleteData = (e) => {
    e.preventDefault();
    const id = data.id;
    dispatch(deleteProductById(id))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        Swal.fire("Item is deleted.", "", "success");
        dispatch(fetchItems());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr className="bg-white border-b">
      <td className="py-4 font-medium text-gray-900 whitespace-wrap">{data.name}</td>
      <td>{data.category}</td>

      <td>{data.Company.name}</td>
      <td>{data.description}</td>
      <td className="flex justify-center">
        <img src={data.imgUrl} className="w-24" />
      </td>
      <td>
        <Link
          to={`/items/${data.id}/edit`}
          href="#"
          className="text-yellow-400 hover:underline font-semibold text-sm"
        >
          Edit
        </Link>
        <a
          href="#"
          onClick={deleteData}
          className="pl-3 text-red-500 hover:underline font-semibold text-sm"
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
