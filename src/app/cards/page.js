'use client'
import CardModal from '@/components/datatables/cards/cardModal';
import CardsTable from '@/components/datatables/cards/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import NameFilter from '@/components/filterForm';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

export default function CardsPage() {

  const { error } = useRootState();

  const index = 'cards'
  const singular = 'card'

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Cards</h1>
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
                  <NameFilter index={index} />
                  <CardsTable singular={singular} index={index} />
                </div>
              </div>
            </div>
          </div>
          <CardModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}