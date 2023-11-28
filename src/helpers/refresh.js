import http from "./http";

export default function refreshData(index, globalState, setData, setIsFetching, setError, callback) {
  if (globalState[index] === undefined) {
    setIsFetching(true);
    http.get('/' + index, {
      headers: {
        Authorization: `Bearer ${globalState.token}`
      }
    }).then(({ data }) => {
      callback(data)
    }).catch(err => {
      setError(err.response?.data.message || err.message)
    }).finally(() => {
      setIsFetching(false);
    })
  } else {
    setIsFetching(false);
    setData(globalState[index]);
  }
}