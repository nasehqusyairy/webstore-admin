import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";

export default function OrderModal() {

  const index = 'orders'
  const singular = 'order'

  const { globalState, setGlobalState, setError } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (detail) {
      setStatus(detail.status);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setStatus('');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('status', status);

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail })
    else storeData({ ...config, resetForm })
  }

  return (
    <ModalLayout handleOnSubmit={handleOnSubmit} singular={singular}>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select disabled={isSending} value={status} onChange={e => setStatus(e.target.value)} className="form-select" id="status" required>
          <option value="">Change Status</option>
          <option value="onprogress">On Progress</option>
          <option value="sending">Sending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </ModalLayout>
  );
}
