import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

// shadcn/ui
import {
  Card,
  CardContent,
} from "@/components/ui/card";

// i18n
import { useTranslation } from "react-i18next";

// Icons
import { QrCode } from "lucide-react";

// Utils
import DownloadButton from "@/components/custom/DownloadButton";

// qr-code-styling
import QRCodeStyling from "qr-code-styling";

const QRCodeCard = () => {

  // Local state
  const [options] = useState({
    width: 200,
    height: 200,
    type: 'svg',
    data: 'https://www.theqrisp.com',
    image: 'logo.png',
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'Q'
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.35,
      margin: 4,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: "#000000",
      type: "rounded"
    },
    backgroundOptions: {
      color: '#FFFFFF',
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'dot'
    }
  });

  const [qrCode] = useState(new QRCodeStyling(options));
  const ref = useRef(null);

  // Redux state
  const qrData = useSelector((state) => state?.qr?.qrData ?? {});
  const logo = useSelector((state) => state?.qr?.logo ?? null);
  const qrCustomization = useSelector((state) => state?.qr?.qrCustomization ?? {});

  // i18n
  const { t } = useTranslation();

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  useEffect(() => {
    let data = '';

    switch(qrData.type) {
      case "url":
        data = qrData.payload.url;
        break;
      case "text":
        data = qrData.payload.text;
        break;
      case "sms":
        data = `SMSTO:${qrData.payload.phone}:${qrData.payload.message}`;
        break;
      case "email":
        data = `mailto:${qrData.payload.email}?subject=${encodeURIComponent(qrData.payload.subject)}&body=${encodeURIComponent(qrData.payload.message)}`;
        break;
      case "Cards":
        data = `${qrData.payload.qr}:${qrData.payload.address}?amount=${qrData.payload.amount}${qrData.payload.message ? `&message=${encodeURIComponent(qrData.payload.message)}` : ''}`;
        break;  
      case "wifi":
        data = `WIFI:T:${qrData.payload.encryption};S:${qrData.payload.ssid};P:${qrData.password};H:${qrData.payload.hidden || false};;`;
        break;
      default:
        data = "Dentalverse"
    }
  
    const updatedOptions = {
      ...options,
      data,
      image: logo || (data === "Dentalverse" ? 'logo.png' : null),
      dotsOptions: {
        color: qrCustomization?.dotOptions?.color,
        type: qrCustomization?.dotOptions?.type
      },
      cornersDotOptions: {
        color: qrCustomization?.centerOptions?.color,
        type: qrCustomization?.centerOptions?.type
      },
      cornersSquareOptions: {
        color: qrCustomization?.cornerOptions?.color,
        type: qrCustomization?.cornerOptions?.type
      },
      backgroundOptions: {
        color: qrCustomization?.backgroundOptions?.color
      }
    };
  
    qrCode.update(updatedOptions);
  }, [qrData, logo, options, qrCode, qrCustomization])

  return (
    <Card className="border-border text-card-foreground overflow-hidden backdrop-blur-sm bg-card/30 py-0 gap-2 flex-1">
      <div className="flex items-center gap-2 border-b border-border p-4.75 font-medium text-sm tracking-tight">
        <QrCode className="h-4 w-4" />
        {t("qrpreview.qrcode")}
      </div>
      <CardContent className="px-4 flex flex-col gap-2 pb-2 h-full">
        <div className="flex items-center w-full h-full justify-center bg-background/30 rounded-md border border-border/40 pt-2 pb-2">
          <div ref={ref} />
        </div>
        <DownloadButton qrCode={qrCode} />
      </CardContent>
    </Card>
  );
};

export default QRCodeCard;
