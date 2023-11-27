import { useProductState } from "@/context/ProductStateContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { ProductModalButton } from "./productModal";
import PlaceholderImage from '@/img/product.jpg';
import { DeleteProductModalButton } from "./deleteModal";

export default function ProductsTable() {

  const { globalState } = useRootState();
  const { data, setData, isFetching, setIsFetching } = useProductState();

  useEffect(() => {
    if (globalState.products === undefined) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
      setData(globalState.products);
    }
  }, [globalState]);

  createTheme('weboender', {
    text: {
      primary: '#065758',
      secondary: '#82c3c5',
    },
  })

  const columns = [
    {
      name: '#',
      sortable: true,
      selector: row => row.number,
    },
    {
      name: 'Image',
      sortable: true,
      cell: row => <img src={row.image || PlaceholderImage.src} alt={row.name} width="100" />,
      selector: row => row.img,
    },
    {
      name: 'Product Name',
      sortable: true,
      selector: row => row.name,
    },
    {
      name: 'Category',
      sortable: true,
      selector: row => row.category.name,
    },
    {
      name: 'Price',
      sortable: true,
      cell: row => "Rp. " + row.price.toLocaleString("id-ID") + ",-",
      selector: row => row.price,
    },
    {
      name: 'Discount',
      sortable: true,
      cell: row => 'Rp. ' + row.discount.toLocaleString("id-ID") + ',-',
      selector: row => row.discount,
    },
    {
      name: 'Stock',
      sortable: true,
      selector: row => row.stock,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <ProductModalButton data={row} />
          <DeleteProductModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data.map((product, index) => { return { ...product, number: index + 1 } })} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}