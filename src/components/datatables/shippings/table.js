import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDataTableState } from "@/context/DataTableContext";
import { DeleteDataTableModalButton } from "@/components/deleteModal";
import refreshData from "@/helpers/refresh";
import { ModalButton } from "@/components/fomModal";

export default function ShippingsTable({ singular, index }) {

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
      selector: row => row.number,
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
    },
    {
      name: 'Internal Price',
      sortable: true,
      selector: row => row.internal_price,
    },
    {
      name: 'External Price',
      sortable: true,
      selector: row => row.external_price,
    },
    {
      name: 'Overseas Price',
      sortable: true,
      selector: row => row.overseas_price,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <ModalButton data={row} singular={singular} />
          <DeleteDataTableModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data.map((category, index) => { return { ...category, number: index + 1 } })} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}