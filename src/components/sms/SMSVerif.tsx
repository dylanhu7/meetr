"use client";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Transition } from "react-transition-group";

import { AsYouType, parsePhoneNumber } from "libphonenumber-js";
import { Input } from "react-daisyui";
import { api } from "../../utils/api";

enum Step {
  Unsent = "unsent",
  InvalidNumber = "invalid_number",
  Sent = "sent",
  InvalidCode = "invalid_code",
  Verified = "verified",
}

const duration = 800;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};

export default function SMSVerif() {
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sentPhoneNumber, setSentPhoneNumber] = useState("");
  const [verifyStep, setVerifyStep] = useState<Step>(Step.Unsent);
  const [sid, setSid] = useState("");
  const [inputCode, setInputCode] = useState("");

  const [secondPageVis, setSecondPageVis] = useState(false);

  const secondNodeRef = useRef(null);

  const verificationServiceMutation =
    api.twilio.verificationService.useMutation({
      onSuccess: (data) => {
        console.log(data);
        let rawPhoneNumber;
        try {
          rawPhoneNumber = parsePhoneNumber(phoneNumber, "US").number ?? null;
        } catch {
          setVerifyStep(Step.InvalidNumber);
        }
        if (rawPhoneNumber && data.sid) {
          setSentPhoneNumber(rawPhoneNumber);
          setSid(data.sid);
          sendTokenMutation.mutate({
            serviceSid: data.sid,
            receivingNumber: rawPhoneNumber,
          });
        }
      },
      onError: (error) => {
        setVerifyStep(Step.InvalidNumber);
        console.log(error);
      },
    });

  const updateNumberMutation = api.user.updateNumber.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const sendTokenMutation = api.twilio.sendToken.useMutation({
    onSuccess: () => {
      setVerifyStep(Step.Sent);
      console.log("success");
      setSecondPageVis(true);
    },
    onError: (error) => {
      setVerifyStep(Step.InvalidNumber);
      console.log(error);
    },
  });

  const checkTokenMutation = api.twilio.checkToken.useMutation({
    onSuccess: (data) => {
      console.log("eeee");
      console.log(data);
      if (data.verification_check == "pending") {
        setVerifyStep(Step.InvalidCode);
      } else {
        setVerifyStep(Step.Verified);
        if (session && session.user) {
          updateNumberMutation.mutate({
            id: session.user.id,
            phone: sentPhoneNumber,
          });
        }
      }
    },
    onError: (error) => {
      setVerifyStep(Step.InvalidCode);
      console.log(error);
    },
  });

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
          <span>{prop.message}</span>
        </div>
      </div>
    );
  }

  const handleNumberSubmit = () => {
    verificationServiceMutation.mutate();
  };

  const handleCodeSubmit = () => {
    if (verificationServiceMutation.data && inputCode && sentPhoneNumber) {
      checkTokenMutation.mutate({
        serviceSid: sid,
        receivingNumber: sentPhoneNumber,
        code: inputCode,
      });
      console.log(checkTokenMutation.data);
    } else {
      console.log("no bitches");
      console.log(sid);
      console.log(inputCode);
      console.log(sentPhoneNumber);
    } // TODO : update the step state
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-4">
          <Input
            type="text"
            placeholder="phone number"
            className="input w-full max-w-xs"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const currentNumber = new AsYouType("US").input(e.target.value);
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

        {verifyStep != Step.InvalidNumber && phoneNumber && (
          <Transition
            nodeRef={secondNodeRef}
            in={secondPageVis}
            timeout={duration}
          >
            {(state) => (
              <div
                ref={secondNodeRef}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state as keyof typeof transitionStyles],
                }}
              >
                <div className="items-center text-center">
                  <div className="flex flex-col gap-3">
                    <SuccesMessage message={"code sent!"} />
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
                      <SuccesMessage message={"verified!"} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </Transition>
        )}
      </div>
    </div>
  );
}
