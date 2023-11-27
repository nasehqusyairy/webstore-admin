import { useRootState } from "@/context/RootStateContext";

function ErrorMessage() {
  const { error, setError } = useRootState()
  return (
    <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
      {error}
      <button type="button" className="btn-close" onClick={() => setError('')}></button>
    </div>
  );
}

export default ErrorMessage;