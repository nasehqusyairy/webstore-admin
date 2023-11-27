import { useProductState } from "@/context/ProductStateContext";
import { useRootState } from "@/context/RootStateContext";

export default function RefreshButton() {
  const { globalState, setGlobalState } = useRootState();
  const { isFetching } = useProductState();

  const refresh = () => {
    const newState = { ...globalState };
    newState.products = undefined;
    newState.categories = undefined;
    setGlobalState(newState);
  }

  return <button className="btn btn-secondary" disabled={isFetching} onClick={refresh}>{isFetching ? 'Refreshing...' : 'Refresh'}</button>
};