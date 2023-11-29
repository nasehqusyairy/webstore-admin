import { useRootState } from "@/context/RootStateContext";
import { fromRupiah, toRupiah } from "@/helpers/rupiah";
import { useEffect, useState } from "react";
import PlaceholderImage from '@/img/product.jpg';
import { useDataTableState } from "@/context/DataTableContext";
import updateData from "@/helpers/updateData";
import storeData from "@/helpers/storeData";
import ModalLayout from "@/components/fomModal";

const SaveButton = ({ isSending, discount, price }) => <button disabled={isSending || discount > price} className="btn btn-primary">{isSending ? 'Saving...' : 'Save'}</button>

export default function ProductModal() {

  const singular = 'product';
  const index = 'products';

  const { globalState, setGlobalState, setError, error } = useRootState();
  const { detail, setData, isSending, setIsSending, setIsCompleted } = useDataTableState();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(PlaceholderImage.src);
  const [imageValue, setImageValue] = useState('');
  const [price, setPrice] = useState('0');
  const [discount, setDiscount] = useState('0');
  const [stock, setStock] = useState(0);

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

    const config = { formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, }

    if (detail) updateData({ ...config, detail, callback: () => setImageValue('') })
    else storeData({ ...config, resetForm })
  }


  return (
    <ModalLayout handleOnSubmit={handleOnSubmit} singular={singular} saveButton={<SaveButton discount={discount} isSending={isSending} price={price} />}>
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
    </ModalLayout>
  );
}
