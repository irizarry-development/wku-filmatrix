import { ForwardedRef, forwardRef } from "react"
import { MdClose } from "react-icons/md";

interface ModalProps {
    children: React.ReactNode
}

export const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<HTMLDialogElement>) => {
    return (
        <dialog className="modal" ref={ref}>
            <section className="modal-body">
                <section className="modal-header">
                    <MdClose 
                        className="modal-close"
                    />
                </section>
                <section className="modal-content">
                    {
                        props.children
                    }
                </section>
            </section>
        </dialog>
    )
})