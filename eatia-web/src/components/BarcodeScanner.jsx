import { useEffect } from "react";
import Quagga from "quagga";

export default function BarcodeScanner({ onDetected }) {
  useEffect(() => {
    Quagga.init({
      inputStream: { type: "LiveStream", constraints: { facingMode: "environment" } },
      decoder: { readers: ["ean_reader", "upc_reader"] }
    }, () => Quagga.start());

    Quagga.onDetected(data => {
      onDetected(data.codeResult.code);
      Quagga.stop();
    });

    return () => Quagga.stop();
  }, []);

  return <div style={{ height: "300px" }} />;
}