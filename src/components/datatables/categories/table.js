import { useRootState } from "@/context/RootStateContext";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { CategoryModalButton } from "./categoryModal";
import http from "@/helpers/http";
import { useDataTableState } from "@/context/DataTableContext";
import { DeleteDataTableModalButton } from "@/components/deleteModal";
import refreshData from "@/helpers/refresh";

export default function CategoriesTable() {

  const { globalState, setGlobalState, setError } = useRootState();
  const { data, setData, isFetching, setIsFetching } = useDataTableState();

  useEffect(() => {
    const index = 'categories';
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
      name: 'Category Name',
      sortable: true,
      selector: row => row.name,
    },
    {
      name: 'Icon',
      sortable: true,
      selector: row => <button className="btn btn-secondary btn-sm"><i className={"d-inline-block me-1 bi bi-" + row.icon}></i> {row.icon}</button>,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <CategoryModalButton data={row} />
          <DeleteDataTableModalButton data={row} />
        </>
      )
    },
  ];

  return <DataTable columns={columns} data={data.map((category, index) => { return { ...category, number: index + 1 } })} progressComponent={'Please wait...'} progressPending={isFetching} paginationRowsPerPageOptions={[5, 10, 100]} paginationPerPage={5} theme='weboender' pagination />;
}