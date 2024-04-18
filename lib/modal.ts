export function toggleModal(ref: React.RefObject<HTMLDialogElement>) {
  if (!ref) return

  if (!ref.current) return

  if (ref.current.open) ref.current.close()
  else ref.current.showModal()
}
