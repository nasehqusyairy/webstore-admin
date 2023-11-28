import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/errorMessage";
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import PlaceholderImage from '@/img/product.jpg';

export function SponsorModalButton({ data }) {

  const { setDetail } = useDataTableState();

  const handleOnclick = () => setDetail(data ? data : undefined)

  return (
    <button onClick={handleOnclick} className={"btn me-1" + (data ? ' btn-warning btn-sm' : ' btn-primary')} data-bs-toggle="modal" data-bs-target="#sponsorModal">
      {data ? <i className="bi bi-pencil"></i> : 'Add New'}
    </button>
  );
}

export default function SponsorModal() {

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setDetail, setData } = useDataTableState();

  const [name, setName] = useState('');
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(PlaceholderImage.src);
  const [imageValue, setImageValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

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

    const index = 'sponsors'
    const singular = 'sponsor'

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail, callback: () => setImageValue('') })
    else storeData({ ...config, resetForm })
  }

  return (
    <div className="modal fade" id="sponsorModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className={"modal-dialog modal-dialog-scrollable modal-dialog-centered"}>
        <form className="modal-content" onSubmit={handleOnSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="sponsorModalLabel">{detail ? 'Edit' : 'Add Sponsor'}</h1>
            {isSending || (isCompleted || <button type="button" onClick={() => setDetail(undefined)} className="btn-close" data-bs-dismiss="modal"></button>)}
          </div>
          {isCompleted ? (
            <div className="modal-body">
              {detail ? 'Sponsor updated successfully' : 'Sponsor added successfully'}
            </div>
          ) : (
            <div className="modal-body">
              {error && <ErrorMessage />}
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
            </div>
          )}
          {isCompleted ? (
            <div className="modal-footer">
              <button type="button" onClick={() => setIsCompleted(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={(e) => { e.preventDefault(); setIsCompleted(false) }} className="btn btn-primary">{detail ? 'Continue Editing' : 'Continue Adding'}</button>
            </div>
          ) : (
            <div className="modal-footer">
              {isSending || <button type="button" onClick={resetForm} className="btn btn-secondary">Reset</button>}
              <button disabled={isSending} className="btn btn-primary">{isSending ? 'Saving...' : 'Save'}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
