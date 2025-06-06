import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import loadingImage from '../../assets/images/loading.svg';
import productPlaceholder from '../../assets/images/placeholder-image.webp';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import {
  getTransactionDetail,
  getTransactionHistory,
} from '../../utils/dataProvider/transaction';
import useDocumentTitle from '../../utils/documentTitle';
import {
  formatDateTime,
  n_f,
} from '../../utils/helpers';

function History() {
  const authInfo = useSelector((state) => state.userInfo);
  const controller = useMemo(() => new AbortController(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [isLoading, setIsLoading] = useState(true);
  const [listMeta, setListMeta] = useState({
    totalData: "0",
    perPage: 6,
    currentPage: 1,
    totalPage: 1,
    prev: null,
    next: null,
  });
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState("");
  const initialValue = {
    isLoading: true,
    isError: false,
    id: 0,
    receiver_email: "",
    receiver_name: "",
    delivery_address: "",
    notes: "",
    status_id: 0,
    status_name: "",
    transaction_time: "",
    payment_id: 0,
    payment_name: "",
    payment_fee: 0,
    delivery_name: "",
    delivery_fee: 0,
    grand_total: 0,
    products: [],
  };
  const [dataDetail, setDataDetail] = useState({
    ...initialValue,
  });
  useDocumentTitle("History");
  const detailController = useMemo(() => new AbortController(), [detail]);

  const fetchDetail = async () => {
    if (detail === "") return;
    try {
      const result = await getTransactionDetail(
        detail,
        authInfo.token,
        detailController
      );
      setDataDetail({ isLoading: false, ...result.data.data[0] });
    } catch (error) {
      if (axios.isCancel(error)) return;
      setDataDetail({ ...detail, isLoading: false, isError: true });
      console.log(error);
    }
  };

  useEffect(() => {
  setIsLoading(true);
  axios
    .get("http://localhost:8083/apiv1/orders")
    .then((res) => {
      setList(res.data); // если сервер возвращает массив заказов
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      setList([]);
    });
}, []);

  // useEffect(() => {
  //   if (page && (page < 1 || isNaN(page))) {
  //     setSearchParams({ page: 1 });
  //     return;
  //   }
  //   window.scrollTo(0, 0);

  //   setIsLoading(true);
  //   getTransactionHistory({ page: page || 1 }, authInfo.token, controller)
  //     .then((result) => {
  //       setList(result.data.data);
  //       setIsLoading(false);
  //       setListMeta(result.data.meta);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //       setList([]);
  //     });
  // }, [page]);

  return (
    <>
      <Header />
      <Modal
        isOpen={detail !== ""}
        onClose={() => setDetail("")}
        className={"w-max max-w-md  md:max-w-none"}
      >
        {dataDetail.isLoading ? (
          <img src={loadingImage} alt="loading..." className="m-2 w-8 h-8" />
        ) : (
          <section className="flex flex-col-reverse md:flex-row gap-5 md:w-[80vw] duration-200">
            <aside className="flex-[2_2_0%] space-y-3">
              <p className="font-semibold">Products</p>
              <div className="flex flex-col h-72 overflow-y-scroll pr-2">
                {dataDetail.products.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm md:text-base gap-2"
                  >
                    <div>
                      <div className="avatar">
                        <div className="w-16 rounded-xl">
                          <img
                            src={
                              item.product_img
                                ? item.product_img
                                : productPlaceholder
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.product_name} x{item.qty}
                      </p>
                      <p>{item.size}</p>
                    </div>
                    <div className="">
                      <p className="">KZT {n_f(item.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            <aside className="flex-1 flex flex-col gap-1 text-sm">
              <p className="font-bold mb-2">Detail Information</p>
              <div className="flex justify-between">
                <p className="font-semibold">Grand Total</p>
                <p>KZT {n_f(dataDetail.grand_total)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Payment Method</p>
                <p>{dataDetail.payment_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Status</p>
                <p>{dataDetail.status_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Delivery Type</p>
                <p>{dataDetail.delivery_name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Transaction at</p>
                <p>{formatDateTime(dataDetail.transaction_time)}</p>
              </div>
              <div className="flex flex-col mt-1">
                <p className="font-semibold">Delivery address</p>
                <p className="break-words">
                  {dataDetail.delivery_address || "no address"}
                </p>
              </div>
              <div className="flex flex-col mt-1">
                <p className="font-semibold">Notes</p>
                <p className="break-words">{dataDetail.notes || "no notes"}</p>
              </div>
            </aside>
          </section>
        )}
      </Modal>
      <main>
  <h2 className="text-2xl font-bold mb-4 text-center">История заказов</h2>
  {!isLoading ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">№</th>
            <th className="py-2 px-4 border-b">Товары</th>
            <th className="py-2 px-4 border-b">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {list.map((order, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order[0] && order[0].length > 0 ? (
                    order[0].map((prod, pidx) => (
                      <li key={pidx}>
                        {prod.name} x{prod.qty}
                      </li>
                    ))
                  ) : (
                    <li>Нет товаров</li>
                  )}
                </ul>
              </td>
              <td className="py-2 px-4 border-b text-center font-semibold">
                {order[0]
                  ? order[0]
                      .reduce(
                        (sum, prod) =>
                          sum +
                          (prod.subtotal ||
                            (prod.price && prod.qty
                              ? prod.price * prod.qty
                              : 0)),
                        0
                      )
                  : 0}{" "}
                KZT
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>Загрузка...</p>
  )}
</main>
      <Footer />
    </>
  );
}

export default History;