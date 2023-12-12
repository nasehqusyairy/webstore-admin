"use client"
import ErrorMessage from "@/components/errorMessage";
import { useRootState } from "@/context/RootStateContext";
import http from "@/helpers/http";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaceholderImage from "@/img/product.jpg";
import { toRupiah } from "@/helpers/rupiah";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [isFetching, setIsFetching] = useState(true);

  const { globalState, setError, error } = useRootState();

  useEffect(() => {
    http.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${globalState.token}`
      }
    }).then(({ data }) => {
      setOrder(data.order);
    }).catch(err => {
      setError((err.response?.data.message || err.message) + ` (${err.response?.status})`);
    }).finally(() => {
      setIsFetching(false);
    });
  }, []);
  return (

    <main className="py-3 bg-light">
      <div className="container">
        <h1>Order Details</h1>
        <hr />
        {error && <ErrorMessage />}
        {isFetching ?
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <p className="m-0">Loading...</p>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-4 text-center">
                      <img src={order.user.img} alt="" className="img-fluid img-thumbnail mb-3" />
                    </div>
                    <div className="col">
                      <h3>Customer</h3>
                      <hr />
                      <table className="w-100">
                        <tbody>
                          <tr>
                            <td>Name</td>
                            <td width={50} className="text-center">:</td>
                            <td>{order.user.name}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td width={50} className="text-center">:</td>
                            <td>{order.user.email}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td width={50} className="text-center">:</td>
                            <td>{order.user.phone}</td>
                          </tr>
                          <tr>
                            <td>Card Number</td>
                            <td width={50} className="text-center">:</td>
                            <td>{order.card.number}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h3>Shipping</h3>
                  <p>Status : {order.status}</p>
                  <hr />
                  <table className="w-100">
                    <tbody>
                      <tr>
                        <td>Option</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.shipping.name}</td>
                      </tr>
                      <tr>
                        <td>Place Name</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.name || '-'}</td>
                      </tr>
                      <tr>
                        <td>Street</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.street || '-'}</td>
                      </tr>
                      <tr>
                        <td>Number</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.number || '-'}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.city || '-'}</td>
                      </tr>
                      <tr>
                        <td>Province</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.province || '-'}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.state || '-'}</td>
                      </tr>
                      <tr>
                        <td>Zip</td>
                        <td width={50} className="text-center">:</td>
                        <td>{order.address.zip_code || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h3>Products</h3>
                  <p>Total : {toRupiah(order.total)}</p>
                  <hr />
                  <ul className="list-group list-group-flush">
                    {order.products.map((product, i) =>
                      <li className="list-group-item" key={i}>
                        <div className="row">
                          <div className="col-12 col-md-3 mb-3 text-center">
                            <img src={product.image || PlaceholderImage.src} alt="" className="img-fluid img-thumbnail" />
                          </div>
                          <div className="col">
                            <h5>{product.name}</h5>
                            <table>
                              <tbody>
                                <tr>
                                  <td>Category</td>
                                  <td width={50} className="text-center">:</td>
                                  <td>{product.category.name}</td>
                                </tr>
                                <tr>
                                  <td>Quantity</td>
                                  <td width={50} className="text-center">:</td>
                                  <td>{product.pivot.quantity}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </main>
  );
}

export default OrderDetail;