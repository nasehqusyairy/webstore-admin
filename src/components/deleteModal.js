import ErrorMessage from "@/components/errorMessage";
import { useDataTableState } from "@/context/DataTableContext";
import { useRootState } from "@/context/RootStateContext";
import http from "@/helpers/http";
import { useState } from "react";

export function DeleteDataTableModalButton({ data }) {

  const { setDetail } = useDataTableState();

  const handleOnClick = () => setDetail(data)

  return (
    <button onClick={handleOnClick} className='btn btn-sm btn-danger' data-bs-toggle="modal" data-bs-target="#deleteDataTableModal">
      <i className="bi bi-trash"></i>
    </button>
  );
}

export default function DeleteDataTableModal({ index, singular }) {

  const { globalState, setGlobalState, error, setError } = useRootState();
  const { detail, setDetail, setData } = useDataTableState();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnclick = () => {
    setIsDeleting(true);
    http.delete(`/${index}/` + detail.id, {
      headers: {
        Authorization: `Bearer ${globalState.token}`
      }
    }).then(() => {
      const newState = { ...globalState };
      newState[index] = newState[index].filter((data) => data.id !== detail.id);
      setGlobalState(newState);
      setData(newState[index]);
    }).catch(err => {
      setError((err.response?.data.message || err.message) + ` (${err.response?.status})`);
    }).finally(() => {
      setIsDeleting(false);
      setDetail(undefined);
    });
  }

  return (
    <div className="modal fade" id="deleteDataTableModal" data-bs-backdrop='static' data-bs-keyboard='false' tabIndex="-1" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-capitalize" id="deleteDataTableModalLabel">Delete {singular}</h5>
          </div>
          <div className="modal-body">
            {error ? <ErrorMessage /> : (detail ? `Are you sure you want to delete this ${singular}?` : `Delete ${singular} successfully`)}
          </div>
          {detail ? (
            <div className="modal-footer">
              {isDeleting || <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>}
              <button onClick={handleOnclick} disabled={isDeleting} type="button" className="btn btn-primary">{isDeleting ? 'Deleting...' : 'Delete'}</button>
            </div>) : (
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
