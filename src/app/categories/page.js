'use client'
import CategoryModal from '@/components/datatables/categories/categoryModal';
import CategoriesTable from '@/components/datatables/categories/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import NameFilter from '@/components/filterForm';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

export default function CategoriesPage() {

  const { error } = useRootState();
  const index = 'categories';
  const singular = 'category';

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Categories</h1>
        <hr />
        <DataTableStateContainer index={index}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <ModalButton singular={singular} />
                <RefreshButton index={index} />
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <NameFilter index={index} />
                  <CategoriesTable index={index} singular={singular} />
                </div>
              </div>
            </div>
          </div>
          <CategoryModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}
