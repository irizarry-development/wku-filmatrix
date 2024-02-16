import { ForwardedRef, forwardRef } from "react"
import { MdClose } from "react-icons/md";

interface ModalProps {
    children: React.ReactNode
    toggleHandler: () => void
}

export const Modal = forwardRef(({
    children, toggleHandler
}: ModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
        <dialog className="modal" ref={ref}>
            <section className="modal-body">
                <section className="modal-header">
                    <MdClose 
                        className="modal-close"
                        onClick={toggleHandler}
                    />
                </section>
                <section className="modal-content">
                    {
                        children
                    }
                </section>
            </section>
        </dialog>
    )
})