'use client'
import DeleteProductModal from '@/components/datatables/products/deleteModal';
import ProductFilter from '@/components/datatables/products/filter';
import ProductModal, { ProductModalButton } from '@/components/datatables/products/productModal';
import RefreshButton from '@/components/datatables/products/refreshButton';
import ProductsTable from '@/components/datatables/products/table';
import ProductStateContainer from '@/context/ProductStateContext';

function ProductsPage() {
  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Products</h1>
        <hr />
        <ProductStateContainer>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <ProductModalButton></ProductModalButton>
                <RefreshButton></RefreshButton>
              </div>
              <div className="card">
                <div className="card-body">
                  <ProductFilter></ProductFilter>
                  <ProductsTable></ProductsTable>
                </div>
              </div>
            </div>
          </div>
          <ProductModal></ProductModal>
          <DeleteProductModal></DeleteProductModal>
        </ProductStateContainer>
      </div>
    </main>
  );
}

export default ProductsPage;