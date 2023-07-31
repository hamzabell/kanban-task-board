import React from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from '../components/modals';

function useModal( Component,isMenu=false,  ...other) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(prev => !prev);

    const closeModal = () => setIsOpen(false);

    const ModalContent = () => (
        <>
            {
                isOpen && createPortal(
                    <ModalWrapper  menu={isMenu} setModalStatus={toggle} >
                        <Component onClose={closeModal} { ...other[0] }/>
                    </ModalWrapper>,
                    document.body
                )
            }
        </>
    )

    return { ModalContent, toggle }
}

export default useModal;