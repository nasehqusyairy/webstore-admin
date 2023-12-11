import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";

export default function OrderFilter() {
  const { globalState } = useRootState()
  const { setData } = useDataTableState();
  const [term, setTerm] = useState('');

  useEffect(() => {
    setData(globalState.orders?.filter(item => item.id.toString().toLowerCase().includes(term.toLowerCase()) || item.user.name.toString().toLowerCase().includes(term.toLowerCase()) || item.card.number.toString().toLowerCase().includes(term.toLowerCase()) || item.address.name?.toString().toLowerCase().includes(term.toLowerCase()) || item.address.number?.toString().toLowerCase().includes(term.toLowerCase()) || item.address.street?.toString().toLowerCase().includes(term.toLowerCase()) || item.address.city?.toString().toLowerCase().includes(term.toLowerCase()) || item.address.province?.toString().toLowerCase().includes(term.toLowerCase()) || item.shipping.name.toString().toLowerCase().includes(term.toLowerCase()) || item.total.toString().toLowerCase().includes(term.toLowerCase()) || item.status.toString().toLowerCase().includes(term.toLowerCase())
    ));
  }, [term]);

  return (
    <form className="input-group mb-3">
      <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="form-control" placeholder="Type to search..." />
    </form>
  );
}