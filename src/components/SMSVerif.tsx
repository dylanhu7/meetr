"use client";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import { AsYouType, parsePhoneNumber } from "libphonenumber-js";
import { Input } from "react-daisyui";
import { api } from "../utils/api";

enum Step {
  Unsent = "unsent",
  InvalidNumber = "invalid_number",
  Sent = "sent",
  InvalidCode = "invalid_code",
  Verified = "verified",
}

export default function SMSVerif() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sentPhoneNumber, setSentPhoneNumber] = useState("");
  const [verifyStep, setVerifyStep] = useState<Step>(Step.Unsent);
  const [sid, setSid] = useState("");
  const [inputCode, setInputCode] = useState("");
  const verificationServiceMutation =
    api.twilio.verificationService.useMutation();
  const sendTokenMutation = api.twilio.sendToken.useMutation();
  const checkTokenMutation = api.twilio.checkToken.useMutation();

  function ErrorMessage(prop: { message: string }) {
    return (
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
          <span>{prop.message}</span>
        </div>
      </div>
    );
  }

  function SuccesMessage(prop: { message: string }) {
    return (
      <div className="alert alert-success shadow-lg">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>prop.message</span>
        </div>
      </div>
    );
  }

  const handleNumberSubmit = async () => {
    await verificationServiceMutation.mutate();
    if (verificationServiceMutation.data) {
      let rawPhoneNumber;
      try {
        rawPhoneNumber = parsePhoneNumber(phoneNumber, "US").number ?? null;
      } catch {
        setVerifyStep(Step.InvalidNumber);
      }
      if (rawPhoneNumber && verificationServiceMutation.data.sid) {
        setSentPhoneNumber(rawPhoneNumber);
        setVerifyStep(Step.Sent);
        setSid(verificationServiceMutation.data.sid);
        sendTokenMutation.mutate({
          serviceSid: verificationServiceMutation.data.sid as string,
          receivingNumber: rawPhoneNumber,
        });
      }
    } else {
      console.log("no data");
      console.log(verificationServiceMutation);
      setVerifyStep(Step.InvalidNumber);
    }
  };

  const handleCodeSubmit = () => {
    if (verificationServiceMutation.data && inputCode && sentPhoneNumber) {
      checkTokenMutation.mutate({
        serviceSid: sid as string,
        receivingNumber: sentPhoneNumber,
        code: inputCode,
      });
      console.log(checkTokenMutation.data);
      setVerifyStep(Step.Verified);
    } else {
      console.log("no bitches");
      console.log(sid);
      console.log(inputCode);
      console.log(sentPhoneNumber);
    } // TODO : update the step state
  };

  return (
    <div>
      {(verifyStep == Step.Unsent || verifyStep == Step.InvalidNumber) && (
        <div className="items-center text-center">
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

            {verifyStep == Step.InvalidNumber && (
              <ErrorMessage message={"invalid number"} />
            )}
          </div>
        </div>
      )}

      {(verifyStep == Step.Sent ||
        verifyStep == Step.InvalidCode ||
        verifyStep == Step.Verified) && (
        <div className="items-center text-center">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                placeholder="verification code"
                className="input w-full max-w-xs"
                value={inputCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputCode(e.target.value);
                }}
              />
              <button onClick={handleCodeSubmit}>
                <ArrowSmallRightIcon className="h-6 w-6" />
              </button>
            </div>

            {verifyStep == Step.InvalidCode && (
              <ErrorMessage message={"invalid code"} />
            )}
            {verifyStep == Step.Verified && (
              <SuccesMessage message={"confirmed!"} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
