import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";
import http from "@/helpers/http";
import ErrorMessage from "@/components/errorMessage";
import { useDataTableState } from "@/context/DataTableContext";

export function CategoryModalButton({ data }) {

  const { setDetail } = useDataTableState();

  const handleOnclick = () => setDetail(data ? data : undefined)

  return (
    <button onClick={handleOnclick} className={"btn me-1" + (data ? ' btn-warning btn-sm' : ' btn-primary')} data-bs-toggle="modal" data-bs-target="#categoryModal">
      {data ? <i className="bi bi-pencil"></i> : 'Add New'}
    </button>
  );
}

export default function CategoryModal() {

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setDetail, setData } = useDataTableState();

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

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

    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }

    if (detail) {
      formData.append('_method', 'PUT');
      http.post('/categories/' + detail.id, formData, axiosConfig).then(({ data }) => {
        setIsCompleted(true)
        const newState = { ...globalState };
        newState.categories = newState.categories.map((category) => category.id === data.category.id ? data.category : category);
        setGlobalState(newState);
        setData(newState.categories)
      }).catch(err => {
        setError(err.response?.data.message || err.message)
      }).finally(() => {
        setIsSending(false);
      })

    } else {
      http.post('/categories', formData, axiosConfig).then(({ data }) => {
        setIsCompleted(true)
        resetForm()
        const newState = { ...globalState };
        newState.categories.push(data.category);
        setGlobalState(newState);
        setData(newState.categories)
      }).catch(err => {
        setError(err.response?.data.message || err.message)
      }).finally(() => {
        setIsSending(false);
      })
    }
  }

  return (
    <div className="modal fade" id="categoryModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className={"modal-dialog modal-dialog-scrollable" + (isCompleted ? '' : ' modal-dialog-centered')}>
        <form className="modal-content" onSubmit={handleOnSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="categoryModalLabel">{detail ? 'Edit' : 'Add Category'}</h1>
            {isSending || (isCompleted || <button type="button" onClick={() => setDetail(undefined)} className="btn-close" data-bs-dismiss="modal"></button>)}
          </div>
          {isCompleted ? (
            <div className="modal-body">
              {detail ? 'Category updated successfully' : 'Category added successfully'}
            </div>
          ) : (
            <div className="modal-body">
              {error && <ErrorMessage />}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input disabled={isSending} value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="icon" className="form-label">Icon</label>
                <input disabled={isSending} value={icon} onChange={e => setIcon(e.target.value)} type="text" className="form-control" id="icon" required />
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
