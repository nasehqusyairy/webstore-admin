import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";
import PriceInput from "@/components/priceInput";

export default function ShippingModal() {

  const index = 'shippings'
  const singular = 'shipping'

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [internalPrice, setInternalPrice] = useState(0);
  const [externalPrice, setExternalPrice] = useState(0);
  const [overseasPrice, setOverseasPrice] = useState(0);

  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setInternalPrice(detail.internal_price);
      setExternalPrice(detail.external_price);
      setOverseasPrice(detail.overseas_price);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setInternalPrice(0);
    setExternalPrice(0);
    setOverseasPrice(0);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('internal_price', internalPrice);
    formData.append('external_price', externalPrice);
    formData.append('overseas_price', overseasPrice);

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
      <PriceInput getter={internalPrice} id={'internal_price'} label={'Internal Price'} setter={setInternalPrice} />
      <PriceInput getter={externalPrice} id={'external_price'} label={'External Price'} setter={setExternalPrice} />
      <PriceInput getter={overseasPrice} id={'overseas_price'} label={'Overseas Price'} setter={setOverseasPrice} />
    </ModalLayout>
  );
}
