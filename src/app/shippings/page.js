'use client'
import ShippingModal from '@/components/datatables/shippings/shippingModal';
import ShippingsTable from '@/components/datatables/shippings/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import NameFilter from '@/components/filterForm';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

export default function ShippingsPage() {

  const { error } = useRootState();
  const index = 'shippings';
  const singular = 'shipping';

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Shipping Options</h1>
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
                  <ShippingsTable index={index} singular={singular} />
                </div>
              </div>
            </div>
          </div>
          <ShippingModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}
