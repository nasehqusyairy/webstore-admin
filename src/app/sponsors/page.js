'use client'
import SponsorFilter from '@/components/datatables/sponsors/filter';
import RefreshButton from '@/components/datatables/sponsors/refreshButton';
import SponsorModal, { SponsorModalButton } from '@/components/datatables/sponsors/sponsorModal';
import SponsorsTable from '@/components/datatables/sponsors/table';
import DeleteDataTableModal from '@/components/deleteModal';
import ErrorMessage from '@/components/errorMessage';
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
                <SponsorModalButton />
                <RefreshButton />
              </div>
              {error && <ErrorMessage />}
              <div className="card">
                <div className="card-body">
                  <SponsorFilter />
                  <SponsorsTable />
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