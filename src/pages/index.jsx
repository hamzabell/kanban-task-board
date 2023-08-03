import { HideSidebar, SidebarItems } from '../components/Sidebar/Sidebar.components';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Button from '../components/button';
import classnames from '../utils/classnames';
import useModal from '../hooks/useModal';
import { addNewBoard, addNewTask, deleteBoard, updateBoard } from '../services';
import { BoardModal, TaskModal, DeleteConfirmation, MobileMenu } from '../components/modals';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TasksGroup from '../components/TasksGroup';
import { useAppResize } from '../hooks/useAppResize';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleTheme } from '../store/reducers/app.slice';



export const mobileSize = 375;


export const OpenSidebarIcon = ({ ...other }) => (
    <svg  {...other} width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H32C45.2548 0 56 10.7452 56 24C56 37.2548 45.2548 48 32 48H0V0Z" fill="#635FC7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M33.8154 23.4342C32.2491 20.7764 29.328 19 26 19C22.6706 19 19.7501 20.7776 18.1846 23.4342C17.9385 23.8519 17.9385 24.3703 18.1846 24.788C19.7509 27.4458 22.6719 29.2222 26 29.2222C29.3294 29.2222 32.2499 27.4446 33.8154 24.788C34.0615 24.3703 34.0615 23.8519 33.8154 23.4342ZM26 27.8889C23.9122 27.8889 22.2222 26.1992 22.2222 24.1111C22.2222 22.0233 23.9118 20.3333 26 20.3333C28.0878 20.3333 29.7778 22.0229 29.7778 24.1111C29.7778 26.1989 28.0882 27.8889 26 27.8889ZM26 27C27.5955 27 28.8889 25.7066 28.8889 24.1111C28.8889 22.5156 27.5955 21.2222 26 21.2222C25.5081 21.2222 25.045 21.3453 24.6396 21.5621L24.6405 21.5621C25.2975 21.5621 25.8301 22.0947 25.8301 22.7516C25.8301 23.4086 25.2975 23.9412 24.6405 23.9412C23.9836 23.9412 23.451 23.4086 23.451 22.7516L23.451 22.7507C23.2342 23.1561 23.1111 23.6192 23.1111 24.1111C23.1111 25.7066 24.4045 27 26 27Z" fill="white"/>
    </svg>
)

export const EmptyBoard = ({ handler }) => (
    <div className="app__empty-state">
        <h1 className='app__empty-state-message'>This board is empty. Create a new column to get started.</h1>
            
        <Button primary otherClasses="app__empty-state-button" onClick={handler}>+ Add New Column</Button>
    </div>
)

export const NoBoardsCreated = ({ handler }) => (
    <div className="app__empty-state">
        <h1 className='app__empty-state-message'>You have not selected a board.</h1>
            
        <Button primary otherClasses="app__empty-state-button" onClick={handler}>+ Add New Board</Button>
    </div>
)


function HomePage() {
    let { boardId }= useParams();
    const dispatch = useDispatch();
    const allBoards = useSelector(state => state.boards.boards);
    const theme = useSelector(state => state.app.theme);
    const isSidebarOpen = useSelector(state => state.app.sidebar);
    const navigate = useNavigate();
    const { windowSize } = useAppResize();

    const [isMobile, setIsMobile] = useState(false);

    const currentBoard = useMemo(() => allBoards.filter(x => x.id == boardId)[0] || { id: null, name: null, columns: []}, [boardId, allBoards])
    const boardState =  useMemo(() => allBoards.map(x => ({ ...x, selected: Boolean(x.id == boardId)})), [boardId, allBoards])

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme])


    useEffect(() => {
        setIsMobile(windowSize <= mobileSize);
    }, [windowSize]);



    const { ModalContent: DeleteBoardModal, toggle: toggleDeleteBoardModal } = useModal(DeleteConfirmation);
    const { ModalContent: EditBoardModal, toggle: toggleEditBoardModal } = useModal(BoardModal);
    const { ModalContent: AddBoardModal, toggle: toggleAddBoardModal } = useModal(BoardModal);
    const { ModalContent: AddTaskModal , toggle: toggleAddTaskModal } = useModal(TaskModal);
    const { ModalContent: MobileMenuModal, toggle: toggleMobileMenu } = useModal(MobileMenu, true)

    const modalHandler = (option) => {
        switch (option) {
            case 'edit':
                toggleEditBoardModal()
                return;
            case 'delete':
                toggleDeleteBoardModal()
                return;
            case 'add':
                toggleAddTaskModal();
                return;
            case 'add-board':
                toggleAddBoardModal();
                return;
        }
    }

    return ( 
        <>
        
            { (boardState && allBoards)  && (
                <div className="app">
                    {
                        isSidebarOpen && (
                            <Sidebar 
                                theme={theme}
                                toggle={() => dispatch(toggleTheme())}
                                boardCount={boardState.length}
                                onAddNewBoard={() => modalHandler('add-board')}
                                hidesidebar={<HideSidebar handler={()=> dispatch(toggleSidebar())} hideSidebar={isSidebarOpen} />}
                                >
                                    <SidebarItems handler={(v) => navigate(`/${v}`)} items={allBoards?.map(x => ({ ...x, selected: Boolean(x.id === boardId)}))}/>
                            </Sidebar>
                        )
                    }

                    <section className='app__content'>
                        {
                            
                            <Header 
                            boardName={currentBoard?.name ?? ""} 
                            hasSidebar={isSidebarOpen} 
                            onAddTask={() => modalHandler('add')}
                            onOptionsClick={(option) => modalHandler(option)}
                            openNav={() =>  isMobile ? toggleMobileMenu() : dispatch(toggleSidebar())}
                            hideRight={Boolean((Boolean(boardId) && allBoards.length > 0))}
                            />
                        
                        }

                        <main className={classnames("app__body", { "app__body--empty": allBoards.length == 0 || Boolean(!boardId) || currentBoard?.columns.length == 0})}>
                            {
                                (allBoards.length == 0 || Boolean(!boardId)) ?
                                (
                                    <NoBoardsCreated handler={() => modalHandler('add-board') }/>
                                ) : 
                                (
                                    <>
                                        {
                                            currentBoard?.columns.length > 0 ? (
                                                <TasksGroup boardId={boardId} />
                                            )
                                            :
                                            (
                                                <EmptyBoard handler={() => modalHandler('edit')} />
                                            )
                                        }
                                    </>
                                )
                            }
                        </main>

                        {
                            !isSidebarOpen && (
                                <div className="app__content-toggle-sidebar">
                                    <OpenSidebarIcon   onClick={() => dispatch(toggleSidebar())}/>
                                </div>
                            )
                        }

                    </section>
                    

                    {/* Modals */}

                    <DeleteBoardModal 
                        deleteFor={currentBoard?.name || ""} 
                        handler={() => {
                            deleteBoard(dispatch, boardId);
                            toggleDeleteBoardModal();
                        }} />
                    <EditBoardModal 
                    onSubmit={(values) => {
                        updateBoard(dispatch, { ...values, id: boardId });
                        toggleEditBoardModal()
                        }} 
                        defaultValues={currentBoard}
                        />
                    <AddTaskModal onSubmit={(values) => {
                        addNewTask(dispatch, {...values, boardId})
                        toggleAddTaskModal();
                        }} 
                        statusOptions={currentBoard?.columns || []} 
                    />
                    <AddBoardModal onSubmit={(values) => addNewBoard(dispatch, values)}/>
                    <MobileMenuModal 
                        boardCount={allBoards.length} 
                        onAddNewBoard={() => {
                            toggleMobileMenu();
                            modalHandler('add-board')
                        }}
                        theme={theme}
                        toggle={() => dispatch(toggleTheme())}
                    >
                        <SidebarItems 
                            handler={(v) => {
                                toggleMobileMenu(); 
                                navigate(`/${v}`)
                            }} 
                            items={allBoards.map(x => ({ ...x, selected: Boolean(x.id === boardId)}))}
                        />
                    </MobileMenuModal>
                </div>
            )}
        </>
     );
}

export default HomePage;