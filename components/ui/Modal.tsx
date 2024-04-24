import { MdClose } from "react-icons/md"

interface ModalProps {
  children: React.ReactNode
  toggleHandler: () => void
  open: boolean
}

export default function Modal({ children, toggleHandler, open }: ModalProps) {
  return (
    <dialog className="modal" open={open}>
      <section className="modal-body">
        <section className="modal-header">
          <MdClose className="modal-close" onClick={toggleHandler} />
        </section>
        <section className="modal-content">{children}</section>
      </section>
    </dialog>
  )
}
