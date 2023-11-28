import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDataTableState } from "@/context/DataTableContext";
import { DeleteDataTableModalButton } from "@/components/deleteModal";
import refreshData from "@/helpers/refresh";
import { SponsorModalButton } from "./sponsorModal";
import PlaceholderImage from '@/img/product.jpg';

export default function SponsorsTable() {

  const { globalState, setGlobalState, setError } = useRootState();
  const { data, setData, isFetching, setIsFetching } = useDataTableState();

  useEffect(() => {
    const index = 'sponsors';
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
          <SponsorModalButton data={row} />
          <DeleteDataTableModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data.map((row, index) => { return { ...row, number: index + 1 } })} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}