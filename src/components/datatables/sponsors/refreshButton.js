import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";

export default function RefreshButton() {
  const { globalState, setGlobalState } = useRootState();
  const { isFetching } = useDataTableState();

  const refresh = () => {
    const newState = { ...globalState };
    newState.sponsors = undefined;
    setGlobalState(newState);
  }

  return <button className="btn btn-secondary" disabled={isFetching} onClick={refresh}>{isFetching ? 'Refreshing...' : 'Refresh'}</button>
};