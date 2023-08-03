import classnames from "../../utils/classnames";
import DeleteConfirmation from "./DeleteConfirmation.modal";
import MobileMenu from "./MobileMenu.modal";
import TaskModal from './Task.modal';
import TaskInfoModal from './TaskInfo.modal';
import BoardModal from './Board.modal';


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


export {
    DeleteConfirmation,
    MobileMenu,
    TaskModal,
    TaskInfoModal,
    BoardModal
}