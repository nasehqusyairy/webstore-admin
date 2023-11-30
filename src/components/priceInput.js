import { useDataTableState } from "@/context/DataTableContext";
import { fromRupiah, toRupiah } from "@/helpers/rupiah";

function PriceInput({ setter, getter, id, label, isRequired = true }) {
  const { isSending } = useDataTableState();
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input disabled={isSending} value={toRupiah(getter)} onChange={e => setter(fromRupiah(e.target.value !== 'Rp. ' ? e.target.value : '0'))} type="text" className="form-control" id={id} required={isRequired} />
    </div>
  );
}

export default PriceInput;