import { useEffect, useMemo, useState } from "react";
import CardWrapper, { CardTitle } from "../Card/CardWrapper";
import Card from '../Card';
import useModal from "../../hooks/useModal";
import Task from "../modals/Task.modal";
import TaskInfo from "../modals/TaskInfo.modal";
import { DeleteConfirmation } from "../modals";
import { editTask } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, removeTask, toggleSubtask, updateTask } from "../../store/reducers/task.slice";

const COLORS = ['#49C4E5', '#8471F2', '#67E2AE'];

function TasksGroup({ boardId }) {
    const tasks = useSelector(state => state.tasks.tasks);
    const boards = useSelector(state => state.boards.boards);
    const [selectedTask, setSelectedTask] = useState(null);
    const boardColumns = useMemo(() => boards.filter(x => x.id == boardId)[0].columns || [], [boardId, boards]);
    const columnTaskCount = useMemo(() =>  tasks.reduce((acc, curr) => 
    ({ ...acc, [curr.status]: acc[curr.status] ? acc[curr.status] + 1 : 1 }), {}), [boardId, tasks]);
    const boardTasks = useMemo(() => tasks.reduce((acc, curr) => ({
        ...acc,
        [curr.status]: acc[curr.status] ?  [...acc[curr.status], curr] : [curr]
    }), {}), [boardId, tasks]);
    const dispatch = useDispatch();

    const { ModalContent: EditTaskModal, toggle: toggleEditTaskModal } = useModal(Task);
    const { ModalContent: TaskInfoModal, toggle: toggleTaskInfoModal } = useModal(TaskInfo);
    const { ModalContent: DeleteModal, toggle: toggleDeleteModal } = useModal(DeleteConfirmation);


    const modalToggleHandler = (modal, task=null) => {
        setSelectedTask(task);

        switch(modal) {
            case 'edit-task':
                toggleEditTaskModal();
                return;
            case 'task-info':
                toggleTaskInfoModal();
                return;
            case 'delete-task':
                console.log(task)
                toggleDeleteModal();
                return;
        }
    }

    return (  
        <div className="app-task-board">



            {
                boardColumns?.map((x, idx) => (
                    <CardWrapper key={idx}  title={<CardTitle  color={COLORS[Math.floor(Math.random() * 2) + 1]} title={x.name} count={columnTaskCount[x.id] ?? 0} />}>
                        {
                            boardTasks[x.id]?.map((y, i) => (
                                <>
                                    <Card 
                                        key={i} 
                                        completed={y.completed.length} t
                                        total={y.subtasks.length} 
                                        title={y.title}  
                                        onClick={() => modalToggleHandler('task-info', {
                                            id: y.id,
                                            statuses: boardColumns,
                                            subtasks: y.subtasks,
                                            optionClicked: (v) => {
                                                toggleTaskInfoModal();
                                                v == 'edit' ? modalToggleHandler('edit-task', { ...y }): modalToggleHandler('delete-task', { id: y.id, title: y.title })
                                            },
                                            onStatusChange: (v) => dispatch(changeStatus({ taskId: y.id, statusId: v })),
                                            handlerCheck: (v) => dispatch(toggleSubtask({ taskId: y.id, subtaskIdx: v}))
                                        })}
                                    />
                                </>

                            ))
                        }
                    </CardWrapper>
                ))
            }

            <EditTaskModal  onSubmit={(v) => {
                dispatch(updateTask(v))
                toggleEditTaskModal()
                }} 
                defaultValues={{...selectedTask}} 
                statusOptions={boardColumns}/>
            <TaskInfoModal {...selectedTask}  />
            <DeleteModal deleteFor={selectedTask?.title || ''} handler={() => {
                dispatch(removeTask({ id: selectedTask?.id }));
                toggleDeleteModal();
            }} />
        </div>
    );
}

export default TasksGroup;