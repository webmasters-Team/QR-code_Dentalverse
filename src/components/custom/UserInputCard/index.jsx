// React
import { useState } from "react";

// Redux
import { useDispatch } from 'react-redux';
import { setQrData } from '@/store/slices/qrSlice';

// shadcn
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// i18n
import { useTranslation } from "react-i18next";

// Icons
import {
  Link,
  Mail,
  Wifi,
  Wallet,
  Smartphone,
} from "lucide-react"

// Utils
import { TAB_OPTIONS } from "@/components/custom/UserInputCard/settings";
import { SYMBOLS } from "@/components/custom/UserInputCard/settings";

const UserInputCard = () => {

  // Redux
  const dispatch = useDispatch();

  // Local states
  const [activeTab, setActiveTab] = useState("url")

  const [urlData, setUrlData] = useState({ url: "" });
  const [textData, setTextData] = useState({ text: "" });
  const [smsData, setSMSData] = useState({ phone: "", message: "" });
  const [emailData, setEmailData] = useState({ email: "", subject: "", message: "" });
  const [cryptoData, setCryptoData] = useState({ amount: "", address: "", message: "", currency: "btc", qr: "bitcoin"});
  const [wifiData, setWifiData] = useState({ ssid: "", password: "", encryption: "WPA", hidden: false });

  // i18n
  const { t } = useTranslation();


  const handleDataChange = (type, data) => {
    const isEmpty = (data) => {
      return Object.values(data).every(value => value === "");
    };

    if (isEmpty(data)) {
      dispatch(setQrData({}));
    } else {
      dispatch(setQrData({ type, payload: data }));
    }
  };

  const handleClearEverything = () => {
    setUrlData({ url: "" });
    setTextData({ text: "" });
    setSMSData({ phone: "", message: "" });
    setEmailData({ email: "", subject: "", message: "" });
    setCryptoData({ amount: "", address: "", message: "", currency: "btc", qr: "bitcoin"});
    setWifiData({ ssid: "", password: "", encryption: "WPA", hidden: false });
    dispatch(setQrData({}));
  }

  return (
    <Card className="border-border text-card-foreground overflow-hidden backdrop-blur-sm bg-card/30 py-0 flex-2">
      <Tabs
        defaultValue="url" 
        value={activeTab} 
        onValueChange={(value) => {
          handleClearEverything();
          setActiveTab(value);
        }}
        className="w-full"
      >
        <div className="border-b border-border">
          <TabsList className="grid grid-cols-5 w-full h-auto p-2 bg-background">
            {TAB_OPTIONS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-2 py-2.5 dark:data-[state=active]:bg-background dark:data-[state=active]:border-border"
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="hidden md:inline">{t(label)}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <CardContent className="p-4 pt-2">
          <TabsContent value="url" className="mt-0">
            <div className="space-y-3">
              <Label htmlFor="url" className="text-sm font-medium">
                {t("userinput.url.websiteurl")}
              </Label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                <Input
                  id="url"
                  placeholder={t("userinput.url.exampleurl")}
                  value={urlData.url}
                  onChange={(e) => {
                    const updated = { url: e.target.value }
                    setUrlData(updated);
                    handleDataChange("url", updated);
                  }}
                  className="pl-9 h-11 transition-all focus-visible:ring-offset-2"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{t("userinput.url.helpertext")}</p>
            </div>
          </TabsContent>

          <TabsContent value="text" className="mt-0">
            <div className="space-y-3">
              <Label htmlFor="text" className="text-sm font-medium">
                {t("userinput.text.textcontent")}
              </Label>
              <Textarea
                id="text"
                placeholder={t("userinput.text.exampletext")}
                value={textData.text}
                onChange={(e) => {
                  const updated = { text: e.target.value }
                  setTextData(updated);
                  handleDataChange("text", updated);
                }}
                className="min-h-[140px] resize-none transition-all focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground mt-1.5">{t("userinput.text.helpertext")}</p>
            </div>
          </TabsContent>

          <TabsContent value="email" className="mt-0">
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  {t("userinput.email.emailaddress")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("userinput.email.exampleemail")}
                    value={emailData.email}
                    onChange={(e) => {
                      const updated = { ...emailData, email: e.target.value };
                      setEmailData(updated);
                      handleDataChange("email", updated);
                    }}
                    className="pl-9 h-11 transition-all focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="subject" className="text-sm font-medium">
                  {t("userinput.email.subject")}
                </Label>
                <Input
                  id="subject"
                  placeholder={t("userinput.email.examplesubject")}
                  value={emailData.subject}
                  onChange={(e) => {
                    const updated = { ...emailData, subject: e.target.value };
                    setEmailData(updated);
                    handleDataChange("email", updated);
                  }}
                  className="h-11 transition-all focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="body" className="text-sm font-medium">
                  {t("userinput.email.message")}
                </Label>
                <Textarea
                  id="body"
                  placeholder={t("userinput.email.examplemessage")}
                  value={emailData.message}
                  onChange={(e) => {
                    const updated = { ...emailData, message: e.target.value };
                    setEmailData(updated);
                    handleDataChange("email", updated);
                  }}
                  className="min-h-[100px] resize-none transition-all focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="mt-0 flex-1 flex flex-col">
            <div className="space-y-5 flex-1">
              <div className="space-y-3">
                <Label htmlFor="crypto-amount" className="text-sm font-medium">
                  {t("userinput.crypto.amount")}
                </Label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                  <Input
                    id="crypto-amount"
                    placeholder={t("userinput.crypto.exampleamount")}
                    value={cryptoData.amount}
                    onChange={(e) => {
                      const updated = { ...cryptoData, amount: e.target.value };
                      setCryptoData(updated);
                      handleDataChange("crypto", updated);
                    }}
                    className="pl-9 h-11 transition-all focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="crypto-address" className="text-sm font-medium">
                  {t("userinput.crypto.address")}
                </Label>
                <div className="flex flex-col gap-2 md:flex-row">
                  <Select 
                    value={cryptoData.currency}
                    onValueChange={(value) => {
                      const selected = SYMBOLS.find(s => s.short === value);
                      const updated = { ...cryptoData, currency: value, qr: selected?.qr || "" };
                      setCryptoData(updated);
                      handleDataChange("crypto", updated);
                    }}
                  >
                    <SelectTrigger className="min-w-[12rem] h-11!">
                      <SelectValue value="btc" />
                    </SelectTrigger>
                    <SelectContent>
                      {(SYMBOLS || []).map(({ name, short }) => (
                        <SelectItem key={short} value={short}>
                          <img src={`/crypto-icons/${short}.png`} className="w-5 h-5"/>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="crypto-address"
                    placeholder={t("userinput.crypto.exampleaddress")}
                    value={cryptoData.address}
                    onChange={(e) => {
                      const updated = { ...cryptoData, address: e.target.value };
                      setCryptoData(updated);
                      handleDataChange("crypto", updated);
                    }}
                    className="h-11 transition-all focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="crypto-message" className="text-sm font-medium">
                  {t("userinput.crypto.message")}
                </Label>
                <Textarea
                  id="crypto-message"
                  placeholder={t("userinput.crypto.examplemessage")}
                  value={cryptoData.message}
                  onChange={(e) => {
                    const updated = { ...cryptoData, message: e.target.value };
                    setCryptoData(updated);
                    handleDataChange("crypto", updated);
                  }}
                  className="min-h-[100px] resize-none transition-all focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wifi" className="mt-0 flex-1 flex flex-col">
            <div className="space-y-5 flex-1">
              <div className="space-y-3">
                <Label htmlFor="wifi-ssid" className="text-sm font-medium">
                  {t("userinput.wifi.networkname")}
                </Label>
                <Input
                  id="wifi-ssid"
                  placeholder={t("userinput.wifi.networkplaceholder")}
                  value={wifiData.ssid}
                  onChange={(e) => {
                    const updated = { ...wifiData, ssid: e.target.value };
                    setWifiData(updated);
                    handleDataChange("wifi", updated);
                  }}
                  className="h-11 transition-all focus-visible:ring-offset-2"
                />
              </div>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                {/* Hidden input to avoid browser warning */}
                <input type="text" name="username" autoComplete="username" className="hidden" />
                <Label htmlFor="wifi-password" className="text-sm font-medium">
                  {t("userinput.wifi.password")}
                </Label>
                <Input
                  id="wifi-password"
                  type="password"
                  placeholder={t("userinput.wifi.passwordplaceholder")}
                  value={wifiData.password}
                  autoComplete="off"
                  onChange={(e) => {
                    const updated = { ...wifiData, password: e.target.value };
                    setWifiData(updated);
                    handleDataChange("wifi", updated);
                  }}
                  className="h-11 transition-all focus-visible:ring-offset-2"
                />
              </form>
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  {t("userinput.wifi.encryption")}
                </Label>
                <Select 
                  value={wifiData.encryption}
                  onValueChange={(value) => {
                    const updated = { ...wifiData, encryption: value };
                    setWifiData(updated);
                    handleDataChange("wifi", updated);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue value="WPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">{t("userinput.wifi.wpa")}</SelectItem>
                    <SelectItem value="WEP">{t("userinput.wifi.wep")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="wifi-hidden"
                  checked={wifiData.hidden}
                  onChange={(e) => {
                    const updated = { ...wifiData, hidden: e.target.checked };
                    setWifiData(updated);
                    handleDataChange("wifi", updated);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary accent-primary"
                />
                <Label htmlFor="wifi-hidden" className="text-sm font-medium">
                  {t("userinput.wifi.hidden")}
                </Label>
              </div>
              </div>
          </TabsContent>

          <TabsContent value="sms" className="mt-0">
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium">
                  {t("userinput.sms.phonenumber")}
                </Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                  <Input
                    id="phone"
                    placeholder={t("userinput.sms.examplephone")}
                    value={smsData.phone}
                    onChange={(e) => {
                      const updated = { ...smsData, phone: e.target.value };
                      setSMSData(updated);
                      handleDataChange("sms", updated);
                    }}
                    className="pl-9 h-11 transition-all focus-visible:ring-offset-2"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-medium">
                  {t("userinput.sms.message")}
                </Label>
                <Textarea
                  id="message"
                  placeholder={t("userinput.sms.examplemessage")}
                  value={smsData.message}
                  onChange={(e) => {
                    const updated = { ...smsData, message: e.target.value };
                    setSMSData(updated);
                    handleDataChange("sms", updated);
                  }}
                  className="min-h-[120px] resize-none transition-all focus-visible:ring-offset-2"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  {t("userinput.sms.messagehelper")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="more" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Button
                variant="outline"
                onClick={() => setActiveTab("wifi")}
                className="h-auto flex-col py-7 px-2 gap-3 justify-center items-center border-border hover:bg-accent/40 hover:border-border transition-all"
              >
                <Wifi className="h-5 w-5" />
                <span className="text-sm font-medium">{t("tabs.taboptions.wifi")}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("sms")}
                className="h-auto flex-col py-7 px-2 gap-3 justify-center items-center border-border hover:bg-accent/40 hover:border-border transition-all"
              >
                <Wallet className="h-5 w-5" />
                <span className="text-sm font-medium">{t("tabs.taboptions.sms")}</span>
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default UserInputCard;