import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type ConfirmationDeleteProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  description?: string;
  yes: string;
  no: string;
};

export default function ConfirmationDelete({
  open,
  onClose,
  onConfirm,
  description,
  yes,
  no,
}: ConfirmationDeleteProps) {
  return (
    <Modal show={open} size="md" onClose={onClose} popup>
      <ModalHeader className="bg-white text-black rounded-t-2xl" />

      <ModalBody className="bg-white rounded-b-2xl">
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-500" />

          <h3 className="mb-5 text-lg font-normal text-black">{description}</h3>

          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onConfirm}>
              {yes}
            </Button>

            <Button color="gray" onClick={onClose}>
              {no}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
