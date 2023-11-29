'use client'
import ProductFilter from '@/components/datatables/products/filter';
import ProductModal, { ProductModalButton } from '@/components/datatables/products/productModal';
import ProductsTable from '@/components/datatables/products/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

function ProductsPage() {
  const { error } = useRootState();
  const index = 'products';
  const singular = 'product';
  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Products</h1>
        <hr />
        <DataTableStateContainer index={index}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <ModalButton singular={singular}></ModalButton>
                <RefreshButton index={[index, 'categories']}></RefreshButton>
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <ProductFilter></ProductFilter>
                  <ProductsTable index={index} singular={singular}></ProductsTable>
                </div>
              </div>
            </div>
          </div>
          <ProductModal></ProductModal>
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}

export default ProductsPage;