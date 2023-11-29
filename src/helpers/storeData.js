import http from "./http";

export default function storeData({ formData, index, singular, globalState, setGlobalState, setData, setIsCompleted, setIsSending, setError, resetForm }) {

  const axiosConfig = {
    headers: {
      'Authorization': `Bearer ${globalState.token}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  http.post(`/${index}`, formData, axiosConfig).then(({ data }) => {
    setIsCompleted(true)
    resetForm()
    const newState = { ...globalState };
    newState[index].push(data[singular]);
    setGlobalState(newState);
    setData(newState[index])
  }).catch(err => {
    setError((err.response?.data.message || err.message) + ` (${err.response?.status})`)
  }).finally(() => {
    setIsSending(false);
  })
}