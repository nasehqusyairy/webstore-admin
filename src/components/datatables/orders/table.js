import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDataTableState } from "@/context/DataTableContext";
import { DeleteDataTableModalButton } from "@/components/deleteModal";
import refreshData from "@/helpers/refresh";
import { ModalButton } from "@/components/fomModal";
import Link from "next/link";
import { toRupiah } from "@/helpers/rupiah";

export default function OrdersTable({ index, singular }) {

  const { globalState, setGlobalState, setError } = useRootState();
  const { data, setData, isFetching, setIsFetching } = useDataTableState();

  useEffect(() => {
    refreshData(index, globalState, setData, setIsFetching, setError, (resData) => {
      const newState = { ...globalState };
      newState[index] = resData[index];
      setGlobalState(newState)
      setData(resData[index]);
    });
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
      selector: row => row.num,
    },
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id,
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.user.name,
    },
    {
      name: 'Card Number',
      sortable: true,
      selector: row => row.card.number,
    },
    {
      name: 'Address',
      sortable: true,
      selector: row => row.address.name,
      cell: row => Object.entries(row.address)
        .filter(([key, value]) => !['user_id', 'id', 'created_at', 'updated_at'].includes(key) && value !== null && value !== undefined)
        .map(([key, value]) => value)
        .join(', ')
    },
    {
      name: 'Shipping',
      sortable: true,
      selector: row => row.shipping.name,
    },
    {
      name: 'Total',
      sortable: true,
      selector: row => row.total,
      cell: row => toRupiah(row.total)
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <Link className='btn btn-info btn-sm me-1' href={`/orders/${row.id}/`}><i className="bi bi-eye"></i></Link>
          <ModalButton data={row} singular={singular} />
          <DeleteDataTableModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data?.map((row, index) => { return { ...row, num: index + 1 } }) || []} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}