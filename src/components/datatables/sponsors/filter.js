import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";

export default function SponsorFilter() {
  const { globalState } = useRootState()
  const { setData } = useDataTableState();
  const [term, setTerm] = useState('');

  useEffect(() => {
    setData(globalState.sponsors.filter(sponsor => sponsor.name.toLowerCase().includes(term.toLowerCase())));
  }, [term]);

  return (
    <form className="input-group mb-3">
      <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="form-control" placeholder="Type to search..." />
    </form>
  );
}