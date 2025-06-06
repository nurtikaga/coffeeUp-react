import React from "react";
import { useNavigate } from "react-router-dom";
import qrImage from "../../assets/images/your-qr-image.png"; // замените на ваш путь

const KaspiQRPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Оплата через Kaspi QR</h1>
      <img src={qrImage} alt="Kaspi QR" className="w-80 h-80 mb-6" />
      <button
        className="btn btn-primary text-white"
        onClick={() => navigate("/history")}
      >
        Я оплатил(а)
      </button>
    </div>
  );
};

export default KaspiQRPage;