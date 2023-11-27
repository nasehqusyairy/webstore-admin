'use client'
import { useRootState } from "@/context/RootStateContext";

export default function Home() {

  const { globalState, setGlobalState } = useRootState();

  return (
    <main className="py-3 bg-light">
      <div className="container">
        <h1>Dashboard</h1>
        <hr />
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card text-primary border-primary">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col border-end">
                    <h3>Products</h3>
                    <p className="text-secondary">{globalState.products?.length}</p>
                  </div>
                  <div className="col-4 text-center">
                    <h1 className="bi bi-box2"></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card text-primary border-primary">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col border-end">
                    <h3>Categories</h3>
                    <p className="text-secondary">{globalState.categories?.length}</p>
                  </div>
                  <div className="col-4 text-center">
                    <h1 className="bi bi-tag"></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
