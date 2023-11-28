'use client'
import CategoryModal, { CategoryModalButton } from '@/components/datatables/categories/categoryModal';
import CategoryFilter from '@/components/datatables/categories/filter';
import RefreshButton from '@/components/datatables/categories/refreshButton';
import CategoriesTable from '@/components/datatables/categories/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

function CategoryPage() {

  const { error } = useRootState();

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Categories</h1>
        <hr />
        <DataTableStateContainer index={'categories'}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <CategoryModalButton />
                <RefreshButton />
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <CategoryFilter />
                  <CategoriesTable />
                </div>
              </div>
            </div>
          </div>
          <CategoryModal />
          <DeleteDataTableModal index={'categories'} singular={'category'}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}

export default CategoryPage;