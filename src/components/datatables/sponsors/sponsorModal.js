import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import PlaceholderImage from '@/img/product.jpg';
import ModalLayout from "@/components/fomModal";

const index = 'sponsors'
const singular = 'sponsor'

export default function SponsorModal() {

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(PlaceholderImage.src);
  const [imageValue, setImageValue] = useState('');

  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setImageURL(detail.image || PlaceholderImage.src);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setImage(undefined);
    setImageValue('');
    setImageURL(PlaceholderImage.src);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail, callback: () => setImageValue('') })
    else storeData({ ...config, resetForm })
  }

  return (
    <ModalLayout handleOnSubmit={handleOnSubmit} singular={singular}>
      <div className="text-center mb-3">
        <img src={imageURL} alt={name + ' image preview'} className="img-fluid rounded" />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">Image</label>
        <input disabled={isSending} value={imageValue} accept="image/*" onChange={e => {
          setImage(e.target.files[0])
          setImageURL(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : PlaceholderImage.src)
          setImageValue(e.target.value)
        }} className="form-control" type="file" id="img" />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input disabled={isSending} value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" required />
      </div>
    </ModalLayout>
  );
}
