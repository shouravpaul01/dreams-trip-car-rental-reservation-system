import { ReactNode, useEffect } from "react";

type TModalProps = {
  children: ReactNode;
  modalId: string | '';
  modalTitle:string;
  width?: string;
  hanleCloseModal:()=>void  
};
const Modal = ({ children, modalId,modalTitle, width,hanleCloseModal }: TModalProps) => {
useEffect(() => {
  const mobalOpen:any= document.getElementById(modalId)
  if (mobalOpen) {
      mobalOpen.showModal()
  }
}, [modalId]);

return (
  <>
  <dialog id={modalId} className="modal " style={{zIndex:1050}}>
    <div className={`modal-box ${width} `} >
    <div className="border-b border-violet-900 " >
    <h3 className="font-bold text-lg">{modalTitle}</h3>
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle  btn-success absolute right-2 top-2" onClick={()=>hanleCloseModal()}>
          ✕
        </button>
      </form>
    </div >
      <div style={{zIndex:1050}}>{children}</div>
    </div>
  </dialog>
  </>
);
};

export default Modal;