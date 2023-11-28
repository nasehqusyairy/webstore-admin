import http from "./http";

export default function updateData({ formData, index, singular, detail, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, callback }) {

  callback = callback || (() => { });

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${globalState.token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  formData.append('_method', 'PUT');
  http.post(`/${index}/` + detail.id, formData, axiosConfig).then(({ data }) => {
    callback()
    setIsCompleted(true)
    const newState = { ...globalState };
    newState[index] = newState[index].map((resData) => resData.id === data[singular].id ? data[singular] : resData);
    setGlobalState(newState);
    setData(newState[index])
  }).catch(err => {
    setError(err.response?.data.message || err.message)
  }).finally(() => {
    setIsSending(false);
  })
}