import React from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from '../components/modals';

function useModal( Component,isMenu=false) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(prev => !prev);

    const closeModal = () => setIsOpen(false);

    

    const ModalContent = ({ ...other }) => (
        <>
            {
                isOpen && createPortal(
                    <ModalWrapper  menu={isMenu} setModalStatus={toggle} >
                        <Component onClose={closeModal} { ...other} />
                    </ModalWrapper>,
                    document.body
                )
            }
        </>
    )

    return { ModalContent, toggle }
}

export default useModal;