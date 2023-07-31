import WithColorScheme from '../../utils/WithColorScheme';
import useModal from '../../hooks/useModal';
import DeleteConfirmation from './DeleteConfirmation.modal';
import MobileMenu from './MobileMenu.modal';
import { SidebarAction } from '../Sidebar';
import Board from './Board.modal';
import Task from './Task.modal';
import TaskInfo from './TaskInfo.modal';

const SidebarItemIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill="#828FA3"/>
    </svg>

)

const SidebarItem = ({title, selected}) => (
    <SidebarAction 
        title={title}
        selected={selected}
        onClick={() => console.log('clicked!')}
        icon={<SidebarItemIcon />}
    />
)

const SidebarItems = () => (
    <>
        <SidebarItem title="Platform Launch" selected={true}/>
        <SidebarItem title="Marketing Plan" selected={false}/>
        <SidebarItem title="Road Map" selected={false}/>
    </>
)

const text = () => <h1 style={{ color: 'var(--input-text)'}}>Hello World!</h1>


const Page = ({ menu, component, ...others }) => {
    const { ModalContent, toggle }  = useModal(component, menu, {...others})
    return (
        <>
            <button onClick={() => toggle()}>Open Modal</button>
            <ModalContent />
        </>
    )
}


export default {
    component: Page,
    title: 'Modal',
    decorators: [WithColorScheme]
}


export const Default = {
    args: {
        component: text
    }
}


export const ConfirmDeletion = {
    args: {
        deleteFor: 'tasks',
        onConfirm: () => console.log('Confirmed deletion!'),
        component: DeleteConfirmation
    }
}

export const EmptyMenuForMobile = {
    args: {
        component: MobileMenu,
        menu: true,
        boardCount: 3
    }
}


export const MenuForMobile = {
    args: {
        component: MobileMenu,
        menu: true,
        boardCount: 3,
        menuOptions: <SidebarItems />
    }
}

export const AddBoardModal = {
    args: {
        component: Board,
        onSubmit: (values) => console.log(values),
    }
}

export const EditBoardModal = {
    args: {
        component: Board,
        onSubmit: (values) => console.log(values),
        defaultValues: {
            name: 'Platform Launch',
            columns: [
                { value: 'Todo' },
                { value: 'Doing' },
                { value: 'Done' }
            ]
        }
    }
}

export const AddTaskModal = {
    args: {
        component: Task,
        onSubmit: (values) => console.log(values),
        statusOptions: ['todo', 'doing', 'done'],
    }
}

export const EditTaskModal = {
    args: {
        component: Task,
        onSubmit: (values) => console.log(values),
        statusOptions: ['todo', 'doing', 'done'],
        defaultValues: {
            title: 'Platform Launch',
            description: 'This is a description',
            subtasks: [
                { value: 'Todo' },
                { value: 'Doing' },
                { value: 'Done' }
            ],
            status: 'doing'
        }
    }
}


export const TaskInfoModal = {
    args: {
        component: TaskInfo,
        title: "Research pricing points of various competitors and trial different business models",
        description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
        completed: 1,
        total: 3,
        currentStatus: 'todo',
        statuses: ['todo', 'doing', 'done'],
        handlerCheck: (v) => console.log(v),
        optionClicked: (v) => console.log(v),
        onStatusChange: (v) => console.log(v),
        subtasks: [
            {
                id: 1,
                title: "Research competitor pricing and business models",
                status: true
            },
            {
                id: 2,
                title: "Outline a business model that works for our solution",
                status: false
            },
            {
                id: 3,
                title: "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                status: false
            }
        ]
    }
}