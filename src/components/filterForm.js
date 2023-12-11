import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";

export default function FilterForm({ index, keys = 'name' }) {
  const { globalState } = useRootState()
  const { setData } = useDataTableState();
  const [term, setTerm] = useState('');

  useEffect(() => {
    const searchKeys = Array.isArray(keys) ? keys : [keys];
    setData(globalState[index]?.filter(item =>
      searchKeys.some(key => {
        // console.log(item, key, item[key]);
        return item[key].toString().toLowerCase().includes(term.toLowerCase())
        // return []
      })
    ));
  }, [term]);

  return (
    <form className="input-group mb-3">
      <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="form-control" placeholder="Type to search..." />
    </form>
  );
}