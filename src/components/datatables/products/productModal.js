import { useRootState } from "@/context/RootStateContext";
import { fromRupiah, toRupiah } from "@/helpers/rupiah";
import { useEffect, useState } from "react";
import PlaceholderImage from '@/img/product.jpg';
import http from "@/helpers/http";
import ErrorMessage from "@/components/errorMessage";
import { useDataTableState } from "@/context/DataTableContext";

export function ProductModalButton({ data }) {

  const { setDetail } = useDataTableState();

  const handleOnclick = () => setDetail(data ? data : undefined)

  return (
    <button onClick={handleOnclick} className={"btn me-1" + (data ? ' btn-warning btn-sm' : ' btn-primary')} data-bs-toggle="modal" data-bs-target="#productModal">
      {data ? <i className="bi bi-pencil"></i> : 'Add New'}
    </button>
  );
}

export default function ProductModal() {

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setDetail, setData } = useDataTableState();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(PlaceholderImage.src);
  const [imageValue, setImageValue] = useState('');
  const [price, setPrice] = useState('0');
  const [discount, setDiscount] = useState('0');
  const [stock, setStock] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (detail) {
      setName(detail.name);
      setCategory(detail.category.id);
      setImageURL(detail.image || PlaceholderImage.src);
      setPrice(detail.price);
      setDiscount(detail.discount);
      setStock(detail.stock);
    } else {
      resetForm();
    }
  }, [detail]);

  const resetForm = () => {
    setName('');
    setCategory('');
    setImage(undefined);
    setImageValue('');
    setImageURL(PlaceholderImage.src);
    setPrice('0');
    setDiscount('0');
    setStock(0);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category_id', category);
    formData.append('image', image || '');
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('stock', stock);

    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${globalState.token}`,
        'Content-Type': 'multipart/form-data'
      }
    }

    if (detail) {
      formData.append('_method', 'PUT');
      http.post('/products/' + detail.id, formData, axiosConfig).then(({ data }) => {
        setImageValue('')
        setIsCompleted(true)
        const newState = { ...globalState };
        newState.products = newState.products.map((product) => product.id === data.product.id ? data.product : product);
        setGlobalState(newState);
        setData(newState.products)
      }).catch(err => {
        setError(err.response?.data.message || err.message)
      }).finally(() => {
        setIsSending(false);
      })

    } else {
      http.post('/products', formData, axiosConfig).then(({ data }) => {
        setIsCompleted(true)
        resetForm()
        const newState = { ...globalState };
        newState.products.push(data.product);
        setGlobalState(newState);
        setData(newState.products)
      }).catch(err => {
        setError(err.response?.data.message || err.message)
      }).finally(() => {
        setIsSending(false);
      })
    }
  }

  return (
    <div className="modal fade" id="productModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className={"modal-dialog modal-dialog-scrollable" + (isCompleted ? '' : ' modal-dialog-centered')}>
        <form className="modal-content" onSubmit={handleOnSubmit}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="productModalLabel">{detail ? 'Edit' : 'Add Product'}</h1>
            {isSending || (isCompleted || <button type="button" onClick={() => setDetail(undefined)} className="btn-close" data-bs-dismiss="modal"></button>)}
          </div>
          {isCompleted ? (
            <div className="modal-body">
              {detail ? 'Product updated successfully' : 'Product added successfully'}
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
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select disabled={isSending} value={category} onChange={e => setCategory(e.target.value)} className="form-select" id="category" required>
                  <option value=''>Select Categories</option>
                  {globalState.categories?.map((category, i) => (
                    <option key={i} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input disabled={isSending} value={toRupiah(price)} onChange={e => setPrice(fromRupiah(e.target.value !== 'Rp. ' ? e.target.value : '0'))} type="text" className="form-control" id="price" required />
              </div>
              <div className="mb-3">
                <label htmlFor="discount" className="form-label">Discount</label>
                <input disabled={isSending} value={toRupiah(discount)} onChange={e => setDiscount(fromRupiah(e.target.value !== 'Rp. ' ? e.target.value : '0'))} type="text" className="form-control" id="discount" required />
                {discount > price && <div className="form-text text-danger">Discount must be less than price</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="form-label">Stock</label>
                <input disabled={isSending} value={stock} onChange={e => setStock(parseInt(e.target.value || 0).toString())} type="number" className="form-control" id="stock" required />
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
              <button disabled={isSending || discount > price} className="btn btn-primary">{isSending ? 'Saving...' : 'Save'}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
