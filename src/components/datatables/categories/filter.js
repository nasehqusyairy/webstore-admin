import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";

function CategoryFilter() {
  const { globalState } = useRootState()
  const { setData } = useDataTableState();
  const [term, setTerm] = useState('');

  useEffect(() => {
    setData(globalState.categories.filter(category => category.name.toLowerCase().includes(term.toLowerCase())));
  }, [term]);

  return (
    <form className="input-group mb-3">
      <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="form-control" placeholder="Type to search..." />
    </form>
  );
}

export default CategoryFilter;