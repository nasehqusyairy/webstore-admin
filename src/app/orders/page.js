'use client'
import OrderFilter from '@/components/datatables/orders/filter';
import OrderModal from '@/components/datatables/orders/orderModal';
import OrdersTable from '@/components/datatables/orders/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage'
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

function OrdersPage() {
  const { error } = useRootState();
  const index = 'orders';
  const singular = 'order';
  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Orders</h1>
        <hr />
        <DataTableStateContainer index={index}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="mb-3">
                <RefreshButton index={index}></RefreshButton>
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <OrderFilter />
                  <OrdersTable index={index} singular={singular}></OrdersTable>
                </div>
              </div>
            </div>
          </div>
          <OrderModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}

export default OrdersPage;