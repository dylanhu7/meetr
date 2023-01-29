"use client";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
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
      setVerifyStep(Step.Invalid);
    }
  };

  const handleCodeSubmit = () => {
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
    <div className="flex shadow-xl">
      {(verifyStep == Step.Unsent || verifyStep == Step.Invalid) && (
        <div className="card-body items-center text-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                placeholder="phone number"
                className="input w-full max-w-xs"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const currentNumber = new AsYouType("US").input(
                    e.target.value
                  );
                  setVerifyStep(Step.Unsent);
                  setPhoneNumber(currentNumber);
                }}
              />
              <button onClick={handleNumberSubmit}>
                <ArrowSmallRightIcon className="h-6 w-6" />
              </button>
            </div>
            {verifyStep == Step.Invalid && (
              <div className="alert alert-error shadow-lg">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 flex-shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Invalid number</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {verifyStep == Step.Sent && (
        <>
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
        </>
      )}
    </div>
  );
}
