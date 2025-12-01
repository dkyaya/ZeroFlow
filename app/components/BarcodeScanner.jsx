"use client";

import { useEffect, useRef } from "react";
import Quagga from "quagga";

export default function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize scanner
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: videoRef.current,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "upc_e_reader"],
        },
      },
      err => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    // When barcode detected
    Quagga.onDetected(data => {
      const code = data.codeResult.code;
      onDetected(code);
      Quagga.stop();
    });

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Scan Barcode</h2>

        <div ref={videoRef} className="w-full h-64 bg-black rounded-lg overflow-hidden" />

        <button
          onClick={onClose}
          className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
