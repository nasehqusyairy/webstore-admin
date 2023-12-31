'use client'
import SponsorModal from '@/components/datatables/sponsors/sponsorModal';
import SponsorsTable from '@/components/datatables/sponsors/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
import FilterForm from '@/components/filterForm';
import { ModalButton } from '@/components/fomModal';
import RefreshButton from '@/components/refreshButton';
import DataTableStateContainer from '@/context/DataTableContext';
import { useRootState } from '@/context/RootStateContext';

export default function SponsorPage() {

  const { error } = useRootState();
  const index = 'sponsors';
  const singular = 'sponsor';

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1 className='text-capitalize'>{index}</h1>
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
                  <FilterForm index={index} />
                  <SponsorsTable index={index} singular={singular} />
                </div>
              </div>
            </div>
          </div>
          <SponsorModal />
          <DeleteDataTableModal index={index} singular={singular}></DeleteDataTableModal>
        </DataTableStateContainer>
      </div>
    </main>
  );
}