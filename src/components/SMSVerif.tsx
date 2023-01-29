"use client";
import { useState } from "react";

import { AsYouType, parsePhoneNumber } from "libphonenumber-js";
import { Input } from "react-daisyui";
import { api } from "../utils/api";

enum Step {
  Unsent = "unsent",
  Invalid = "invalid",
  Sent = "sent",
  Verified = "verified",
}

export default function SMSVerif() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sentPhoneNumber, setSentPhoneNumber] = useState("");
  const [verifyStep, setVerifyStep] = useState<Step>(Step.Unsent);
  const [inputCode, setInputCode] = useState("");
  const verificationServiceMutation =
    api.twilio.verificationService.useMutation();
  const sendTokenMutation = api.twilio.sendToken.useMutation();
  const checkTokenMutation = api.twilio.checkToken.useMutation();

  const handleNumberSubmit = () => {
    verificationServiceMutation.mutate();
    if (verificationServiceMutation.data) {
      let rawPhoneNumber;
      try {
        rawPhoneNumber = parsePhoneNumber(phoneNumber, "US").number ?? null;
      } catch {
        setVerifyStep(Step.Invalid);
      }
      if (rawPhoneNumber && verificationServiceMutation.data.sid) {
        setSentPhoneNumber(rawPhoneNumber);
        setVerifyStep(Step.Sent);
        sendTokenMutation.mutate({
          serviceSid: verificationServiceMutation.data.sid as string,
          receivingNumber: rawPhoneNumber,
        });
      }
    } else {
      console.log("no data");
      console.log(verificationServiceMutation.error);
    }
  };

  const handleCodeSubmit = () => {
    console.log("hewoo");
    if (verificationServiceMutation.data && inputCode && sentPhoneNumber) {
      checkTokenMutation.mutate({
        serviceSid: verificationServiceMutation.data.sid as string,
        receivingNumber: sentPhoneNumber,
        code: inputCode,
      });
      console.log(checkTokenMutation.data);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Input
        type="text"
        placeholder="phone number"
        className="input w-full max-w-xs"
        value={phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const currentNumber = new AsYouType("US").input(e.target.value);
          setVerifyStep(Step.Unsent);
          setPhoneNumber(currentNumber);
        }}
      />
      <button
        className="btn"
        onClick={handleNumberSubmit}
        disabled={sendTokenMutation.isLoading}
      >
        {verifyStep == Step.Unsent
          ? "send verification message"
          : verifyStep == Step.Invalid
          ? "invalid phone number"
          : verifyStep == Step.Sent
          ? "sent"
          : "verified"}
      </button>

      <Input
        type="text"
        placeholder="verification code"
        className="input w-full max-w-xs"
        value={inputCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputCode(e.target.value);
        }}
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
