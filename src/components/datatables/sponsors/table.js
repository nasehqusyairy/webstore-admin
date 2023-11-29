import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDataTableState } from "@/context/DataTableContext";
import { DeleteDataTableModalButton } from "@/components/deleteModal";
import refreshData from "@/helpers/refresh";
import PlaceholderImage from '@/img/product.jpg';
import { ModalButton } from "@/components/fomModal";

export default function SponsorsTable({ index, singular }) {

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
      name: 'Image',
      sortable: true,
      cell: row => <img src={row.image || PlaceholderImage.src} alt={row.name} width="100" />,
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <ModalButton singular={singular} data={row} />
          <DeleteDataTableModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data.map((row, index) => { return { ...row, number: index + 1 } })} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}