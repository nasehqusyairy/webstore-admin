'use client'
import ProductFilter from '@/components/datatables/products/filter';
import ProductModal, { ProductModalButton } from '@/components/datatables/products/productModal';
import RefreshButton from '@/components/datatables/products/refreshButton';
import ProductsTable from '@/components/datatables/products/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

function ProductsPage() {
  const { error } = useRootState();
  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Products</h1>
        <hr />
        <DataTableStateContainer index={'products'}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <ProductModalButton></ProductModalButton>
                <RefreshButton></RefreshButton>
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <ProductFilter></ProductFilter>
                  <ProductsTable></ProductsTable>
                </div>
              </div>
            </div>
          </div>
          <ProductModal></ProductModal>
          <DeleteDataTableModal index={'products'} singular={'product'}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}

export default ProductsPage;