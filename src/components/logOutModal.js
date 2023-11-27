import { useRootState } from "@/context/RootStateContext";
import http from "@/helpers/http";
import { useState } from "react";

export function LogoutButton({ className }) {
  return (
    <button data-bs-toggle="modal" data-bs-target="#logOutModal" className={className}>Sign Out</button>
  );
}

function LogOutModal() {

  const { globalState, setGlobalState } = useRootState();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true)
    http.post('/logout', null,
      {
        headers: {
          Authorization: `Bearer ${globalState.token}`
        }
      }
    ).then(() => setIsLoggedOut(true))
  }

  const clearSession = () => setGlobalState({ user: null, token: null })

  return (
    <div className="modal fade" id="logOutModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="logOutModalLabel">Sign Out</h1>
          </div>
          <div className="modal-body">
            {isLoggedOut ? 'You have been signed out.' : ' You will be signed out of the system. Are you sure?'}
          </div>
          {isLoggedOut ?
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={clearSession}>Leave this page</button>
            </div>
            : (
              <div className="modal-footer">
                {isLoggingOut || <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>}
                <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="btn btn-primary">{isLoggingOut ? 'Signing Out...' : 'Yes, sign me out!'}</button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default LogOutModal;