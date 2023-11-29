import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";

export default function RefreshButton({ index }) {
  const { globalState, setGlobalState } = useRootState();
  const { isFetching } = useDataTableState();

  const refresh = () => {
    const newState = { ...globalState };
    if (Array.isArray(index)) {
      index.forEach(i => {
        newState[i] = undefined;
      });
    } else {
      newState[index] = undefined;
    }
    setGlobalState(newState);
  }

  return <button className="btn btn-secondary" disabled={isFetching} onClick={refresh}>{isFetching ? 'Refreshing...' : 'Refresh'}</button>
};