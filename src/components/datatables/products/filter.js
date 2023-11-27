import { useProductState } from "@/context/ProductStateContext";
import { useRootState } from "@/context/RootStateContext";
import { useEffect, useState } from "react";

function ProductFilter() {
  const { globalState } = useRootState()
  const { setData } = useProductState();
  const [term, setTerm] = useState('');
  const [categories, setCategories] = useState(globalState.categories ? globalState.categories : []);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    setCategories(globalState.categories !== undefined ? globalState.categories : []);
  }, [globalState]);

  useEffect(() => {
    setData(globalState.products.filter(product => {
      if (selectedCategory == 0) {
        return product.name.toLowerCase().includes(term.toLowerCase());
      } else {
        return product.name.toLowerCase().includes(term.toLowerCase()) && product.category.id == selectedCategory;
      }
    }));
  }, [term, selectedCategory]);

  return (
    <form className="input-group mb-3">
      <select className='form-select' value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
        <option value="0">All Categories</option>
        {categories.map((category, i) => (
          <option key={i} value={category.id}>{category.name}</option>
        ))}
      </select>
      <input type="search" value={term} onChange={e => setTerm(e.target.value)} className="form-control" placeholder="Type to search..." />
    </form>
  );
}

export default ProductFilter;