import { useDataTableState } from "@/context/DataTableContext";
import ErrorMessage from "./errorMessage";
import { useRootState } from "@/context/RootStateContext";

export function ModalButton({ data, singular }) {

  const { setDetail } = useDataTableState();

  const handleOnclick = () => setDetail(data ? data : undefined)

  return (
    <button onClick={handleOnclick} className={"btn me-1" + (data ? ' btn-warning btn-sm' : ' btn-primary')} data-bs-toggle="modal" data-bs-target={`#${singular}Modal`}>
      {data ? <i className="bi bi-pencil"></i> : 'Add New'}
    </button>
  );
}

export function ModalFooter({ children, resetForm }) {

  const { detail, isCompleted, setIsCompleted, isSending } = useDataTableState();

  return isCompleted ? (
    <div className="modal-footer">
      <button type="button" onClick={() => setIsCompleted(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" onClick={(e) => { e.preventDefault(); setIsCompleted(false) }} className="btn btn-primary">{detail ? 'Continue Editing' : 'Continue Adding'}</button>
    </div>
  ) : (
    <div className="modal-footer">
      {isSending || <button type="button" onClick={resetForm} className="btn btn-secondary">Reset</button>}
      {children}
    </div>
  )
}

export default function ModalLayout({ children, saveButton, handleOnSubmit, singular }) {

  const { detail, setDetail, isCompleted, isSending } = useDataTableState();
  const { error } = useRootState();

  return (
    <div className="modal fade" id={`${singular}Modal`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
      <div className={"modal-dialog modal-dialog-scrollable modal-dialog-centered"}>
        <form className="modal-content" onSubmit={handleOnSubmit}>
          <div className="modal-header">
            <h1 className="modal-title text-capitalize fs-5" id={`${singular}ModalLabel`}>{detail ? 'Edit' : 'Add ' + singular}</h1>
            {isSending || (isCompleted || <button type="button" onClick={() => setDetail(undefined)} className="btn-close" data-bs-dismiss="modal"></button>)}
          </div>
          {isCompleted ? (
            <div className="modal-body">
              <span className="text-capitalize">
                {singular}
              </span>
              {detail ? ' updated successfully' : ' added successfully'}
            </div>
          ) : (
            <div className="modal-body">
              {error && <ErrorMessage />}
              {children}
            </div>
          )}
          <ModalFooter>{saveButton || <button disabled={isSending} className="btn btn-primary">{isSending ? 'Saving...' : 'Save'}</button>}</ModalFooter>
        </form>
      </div>
    </div>
  );
}

