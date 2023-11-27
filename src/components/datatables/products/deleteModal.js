import ErrorMessage from "@/components/errorMessage";
import { useProductState } from "@/context/ProductStateContext";
import { useRootState } from "@/context/RootStateContext";
import http from "@/helpers/http";
import { useState } from "react";

export function DeleteProductModalButton({ data }) {

  const { setDetail } = useProductState();

  const handleOnClick = () => setDetail(data)

  return (
    <button onClick={handleOnClick} className='btn btn-sm btn-danger' data-bs-toggle="modal" data-bs-target="#deleteProductModal">
      <i className="bi bi-trash"></i>
    </button>
  );
}

export default function DeleteProductModal() {

  const { globalState, setGlobalState, error, setError } = useRootState();
  const { detail, setDetail, setData } = useProductState();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnclick = () => {
    setIsDeleting(true);
    http.delete('/products/' + detail.id, {
      headers: {
        Authorization: `Bearer ${globalState.token}`
      }
    }).then(() => {
      const newState = { ...globalState };
      newState.products = newState.products.filter((product) => product.id !== detail.id);
      setGlobalState(newState);
      setData(newState.products);
    }).catch(err => {
      setError(err.response?.data.message || err.message);
    }).finally(() => {
      setIsDeleting(false);
      setDetail(undefined);
    });
  }

  return (
    <div className="modal fade" id="deleteProductModal" data-bs-backdrop='static' data-bs-keyboard='false' tabIndex="-1" >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteProductModalLabel">Delete Product</h5>
          </div>
          <div className="modal-body">
            {error ? <ErrorMessage /> : (detail ? 'Are you sure you want to delete this product?' : 'Delete product successfully')}
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
