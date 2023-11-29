'use client'
import AddressModal from '@/components/datatables/addresses/addressModal';
import AddressesTable from '@/components/datatables/addresses/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import FilterForm from '@/components/filterForm';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

export default function AddressesPage() {

  const { error } = useRootState();

  const index = 'addresses'
  const singular = 'address'

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Addresses</h1>
        <hr />
        <DataTableStateContainer index={index}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <ModalButton singular={singular}></ModalButton>
                <RefreshButton index={index} />
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <FilterForm index={index} />
                  <AddressesTable singular={singular} index={index} />
                </div>
              </div>
            </div>
          </div>
          <AddressModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}