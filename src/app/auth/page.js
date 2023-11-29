'use client'
import ErrorMessage from "@/components/errorMessage";
import { useRootState } from "@/context/RootStateContext";
import http from "@/helpers/http";
import { useState } from "react";

function LoginPage() {

  const { setGlobalState, error, setError } = useRootState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);

  const login = (e) => {
    e.preventDefault()
    setIsSending(true)
    setError('')
    http.post('/login', { email, password })
      .then(({ data }) => {
        if (data.user.role !== 2) {
          throw new Error('You are not authorized to access this page');
        } else {
          setGlobalState({ user: data.user, token: data.token })
        }
      })
      .catch((err) => {
        console.log(err);
        setError((err.response?.data.message || err.message) + ` (${err.response?.status})`)
        setIsSending(false)
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" id="auth">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <form onSubmit={login}>
                <h3>Sign In</h3>
                <hr />
                {error && <ErrorMessage />}
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input required type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input required type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2">
                  <button disabled={isSending} className="btn btn-primary">{isSending ? 'Checking...' : 'Login'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;