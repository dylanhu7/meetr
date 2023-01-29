/**
 * A modal view to edit a field of a friend or an event.
 */

import { useState } from "react";
import { Button, Modal } from "react-daisyui";

export interface EditModalProps {
  children: React.ReactNode;
  title: string;
  buttonMessage: string;
  onSave?: () => void;
  input: React.ReactNode;
}

export default function EditModal(props: EditModalProps) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible(!visible);

  return (
    <>
      <a onClick={toggleVisible} className="cursor-pointer">
        {props.children}
      </a>
      <Modal open={visible} className="overflow-visible">
        <Modal.Body>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-bold">
                {props.title}
              </span>
            </label>
            {props.input}
          </div>
        </Modal.Body>

        <Modal.Actions>
          <Button onClick={toggleVisible} color="error" variant="outline">
            Cancel
          </Button>
          <Button
            onClick={() => {
              toggleVisible();
              if (props.onSave) {
                props.onSave();
              }
            }}
          >
            {props.buttonMessage}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
