interface ModalProps {
    ref: React.RefObject<HTMLDialogElement>
}

export function Modal({
    ref
}: ModalProps) {
    return (
        <dialog ref={ref} className="modal">
            <h1>Hello Modal</h1>
        </dialog>
    )
}