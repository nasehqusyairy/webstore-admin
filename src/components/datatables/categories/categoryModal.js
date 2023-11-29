import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";

export default function CategoryModal() {

  const index = 'categories'
  const singular = 'category'

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setIcon(detail.icon);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setIcon('');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon', icon);

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail })
    else storeData({ ...config, resetForm })
  }

  return (
    <ModalLayout handleOnSubmit={handleOnSubmit} singular={singular}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input disabled={isSending} value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" required />
      </div>
      <div className="mb-3">
        <label htmlFor="icon" className="form-label">Icon</label>
        <input disabled={isSending} value={icon} onChange={e => setIcon(e.target.value)} type="text" className="form-control" id="icon" required />
      </div>
    </ModalLayout>
  );
}
