import { createContext, useContext, useState } from "react";
import { useRootState } from "./RootStateContext";

export const DataTableState = createContext();

export function useDataTableState() {
  return useContext(DataTableState);
}

export default function DataTableStateContainer({ children, index }) {
  const { globalState } = useRootState();

  const [data, setData] = useState(globalState[index] ? globalState[index] : []);
  const [isFetching, setIsFetching] = useState(true);
  const [detail, setDetail] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  return (
    <DataTableState.Provider value={{ data, setData, isFetching, setIsFetching, detail, setDetail, isCompleted, setIsCompleted, isSending, setIsSending }}>
      {children}
    </DataTableState.Provider>
  );
}