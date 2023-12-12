"use client";
import ErrorMessage from '@/components/errorMessage';
import { useRootState } from '@/context/RootStateContext';
import http from '@/helpers/http';
import profileImg from '@/img/profile.jpg';
import { useEffect, useState } from 'react';

function ProfilePage() {

  const { globalState, setGlobalState, error, setError } = useRootState();

  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(globalState.user?.img || profileImg.src);
  const [success, setSuccess] = useState('');

  const [name, setName] = useState(globalState.user?.name || '');
  const [email, setEmail] = useState(globalState.user?.email || '');
  const [phone, setPhone] = useState(globalState.user?.phone || '');

  useEffect(() => {
    if (globalState.user) {
      setName(globalState.user.name || '');
      setEmail(globalState.user.email || '');
      setPhone(globalState.user.phone || '');
    }
  }, [globalState]);

  const handleOnsubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('_method', 'PUT')
    const data = Object.fromEntries(formData)
    console.log(data)

    if (data.password !== data.verify_password) {
      setError('Password does not match')
      return
    } else if (data.password && data.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsSaving(true)

    http.post('/user/' + globalState.user.id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${globalState.token}`
      }
    }).then(({ data }) => {
      setSuccess('Profile updated')
      setGlobalState({ ...globalState, user: data.user })
      e.target.reset()
    }).catch((err) => {
      setError((err.response?.data.message || err.message) + ` (${err.response?.status})`)
    }).finally(() => {
      setIsSaving(false)
    })

  }

  const preview = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(profileImg.src)
    }
  }

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>My Profile</h1>
        <hr />
        {error && <ErrorMessage />}
        {success && <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" onClick={() => setSuccess('')} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>}
        {globalState.user ? <form className="row" onSubmit={handleOnsubmit}>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card">
              <div className="card-body">
                <img src={imagePreview} alt="" className="img-fluid img-thumbnail mb-3" id="img-preview" />
                <div className="mb-3">
                  <label htmlFor="img" className="form-label">Profile Picture</label>
                  <input className="form-control" name="img" type="file" id="img" onChange={preview} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md mb-3">
            <div className="card">
              <div className="card-body">
                <h3>Edit Profile</h3>
                <hr />
                <div className="mb-3">
                  <label htmlFor="name">Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.phone)} type="text" name="phone" id="phone" className="form-control" />
                </div>
                <h3>Change Password</h3>
                <hr />
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="verify_password">Verify Password</label>
                  <input type="password" name="verify_password" id="verify_password" className="form-control" />
                </div>
                <button disabled={isSaving} className="btn btn-primary">{isSaving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </div>
          </div>
        </form> : <div className="alert alert-danger">You must login first</div>}
      </div>
    </main>
  );
}

export default ProfilePage;