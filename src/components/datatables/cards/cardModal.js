import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";


export default function CardModal() {
  const index = 'cards'
  const singular = 'card'

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setNumber(detail.number);
      setCvv(detail.cvv);
      setMonth(detail.month);
      setYear(detail.year);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setNumber('');
    setCvv('');
    setMonth('1');
    setYear('');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('number', number);
    formData.append('cvv', cvv);
    formData.append('month', month);
    formData.append('year', year);
    formData.append('user_id', globalState.user.id);

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
        <label htmlFor="number" className="form-label">Card Number</label>
        <input disabled={isSending} value={number} onChange={e => setNumber(e.target.value)} type="text" className="form-control" id="number" required />
      </div>
      <div className="mb-3">
        <label htmlFor="cvv" className="form-label">CVV</label>
        <input disabled={isSending} value={cvv} onChange={e => {
          const value = e.target.value;
          if (value.length <= 3 && /^[0-9]*$/.test(value)) {
            setCvv(value);
          }
        }} type="text" className="form-control" id="cvv" required />
      </div>
      <div className="mb-3">
        <label htmlFor="month" className="form-label">Expiration Month</label>
        <select required id="month" className="form-select" disabled={isSending} defaultValue={month} onChange={e => setMonth(e.target.value)}>
          <option value="1">January</option>
          <option value="2">February </option>
          <option value="3">March </option>
          <option value="4">April </option>
          <option value="5">May </option>
          <option value="6">June </option>
          <option value="7">July </option>
          <option value="8">August </option>
          <option value="9">September </option>
          <option value="10">October </option>
          <option value="11">November </option>
          <option value="12">December </option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">Expiration Year</label>
        <input disabled={isSending} value={year} onChange={e => setYear(e.target.value)} type="text" className="form-control" id="year" required />
      </div>
    </ModalLayout>
  );
}