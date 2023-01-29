"use client";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { api } from "../utils/api";

export default function SMSVerif() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [inputCode, setInputCode] = useState();
  const verificationService = api.twilio.verificationService.useQuery();
  const sendTokenMutation = api.twilio.sendToken.useMutation();
  const checkTokenMutation = api.twilio.checkToken.useMutation();

  const handleNumberSubmit = () => {
    verificationService;
    if (verificationService.data) {
      if (phoneNumber && verificationService.data.sid)
        sendTokenMutation.mutate({
          serviceSid: verificationService.data.sid,
          receivingNumber: phoneNumber,
        });
    }
  };

  const handleCodeSubmit = () => {
    console.log("hewoo");
    // checkTokenMutation.mutate({
    //   serviceSid: sid,
    //   receivingNumber: phoneNumber,
    //   code: inputCode,
    // });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <PhoneInput
        international
        placeholder="Enter phone number"
        defaultCountry="US"
        value={phoneNumber}
        onChange={setPhoneNumber}
      />
      <button
        className="btn"
        onClick={handleNumberSubmit}
        disabled={sendTokenMutation.isLoading}
      >
        send message to this number
      </button>

      <input
        type="text"
        placeholder="verification code"
        className="input w-full max-w-xs"
        value={inputCode}
        onChange={setInputCode}
      />
      <button
        className="btn"
        onClick={handleCodeSubmit}
        disabled={checkTokenMutation.isLoading}
      >
        send
      </button>
    </div>
  );
}
