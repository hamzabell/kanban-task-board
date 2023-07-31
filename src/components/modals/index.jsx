import classnames from "../../utils/classnames";

function ModalContainer({  children, menu, setModalStatus }) {
    return (
        <div className="modal" onClick={(e) => {
            e.stopPropagation()
            setModalStatus(false)
        }}>
            <div onClick={(e) => e.stopPropagation()} className={classnames("modal__content", { "modal__content--menu": menu })}>
            {children}
            </div>
        </div> 
    );
}

export default ModalContainer;