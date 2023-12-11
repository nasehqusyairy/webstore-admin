import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";


export default function AddressModal() {
  const index = 'addresses'
  const singular = 'address'

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [state, setState] = useState('');


  useEffect(() => {
    if (detail) {
      setName(detail.name || '');
      setNumber(detail.number || '');
      setZipCode(detail.zip_code || '');
      setStreet(detail.street || '');
      setCity(detail.city || '');
      setProvince(detail.province || '');
      setState(detail.state || '');
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setNumber('');
    setZipCode('');
    setStreet('');
    setCity('');
    setProvince('');
    setState('');
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('number', number);
    formData.append('zip_code', zipCode);
    formData.append('street', street);
    formData.append('city', city);
    formData.append('province', province);
    formData.append('state', state);
    formData.append('user_id', globalState.user.id);

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail })
    else storeData({ ...config, resetForm })
  }

  return (
    <ModalLayout handleOnSubmit={handleOnSubmit} singular={singular}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Place Name</label>
        <input disabled={isSending} value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">PO. Box Number</label>
        <input disabled={isSending} value={number} onChange={e => setNumber(e.target.value)} type="text" className="form-control" id="number" />
      </div>
      <div className="mb-3">
        <label htmlFor="street" className="form-label">Street Name</label>
        <input disabled={isSending} value={street} onChange={e => setStreet(e.target.value)} type="text" className="form-control" id="street" />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input disabled={isSending} value={city} onChange={e => setCity(e.target.value)} type="text" className="form-control" id="city" />
      </div>
      <div className="mb-3">
        <label htmlFor="province" className="form-label">Province</label>
        <input disabled={isSending} value={province} onChange={e => setProvince(e.target.value)} type="text" className="form-control" id="province" />
      </div>
      <div className="mb-3">
        <label htmlFor="zipCode" className="form-label">Zip Code</label>
        <input disabled={isSending} value={zipCode} onChange={e => setZipCode(e.target.value)} type="text" className="form-control" id="zipCode" />
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">State</label>
        <input disabled={isSending} value={state} onChange={e => setState(e.target.value)} type="text" className="form-control" id="state" />
      </div>
    </ModalLayout>
  );
}