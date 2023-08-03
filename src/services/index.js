import { v4 as uuidv4} from 'uuid';
import { addBoard, editBoard, removeBoard } from '../store/reducers/board.slice';
import { addTask } from '../store/reducers/task.slice';



export const deleteTask = id => {
    console.log(id, "deleted task")
}

export const deleteBoard = (dispatch, id) => dispatch(removeBoard({ id }))

export const updateBoard = (dispatch, values) => {
    const { id, name, columns } = values;

    const editedColumns = columns.map(x => {
        if (Boolean(!x.id)) {
            return {...x, id: uuidv4() }
        }
        return x;
    });

    dispatch(editBoard({ id, name, columns: editedColumns }))

}

export const addNewBoard = (dispatch, values) => {
    const { name, columns } = values;

    const boardId = uuidv4();
    const newColumns = columns.map(x => ({
        ...x,
        id: uuidv4(),
    }));


    dispatch(addBoard({ name, columns: newColumns, id: boardId }));
}

export const addNewTask = (dispatch, values) => {
    const { title, description, subtasks, status, boardId } = values;
    const completed = [];

    dispatch(addTask({ title, description, subtasks , status, boardId, completed }))
}

export const editTask = values => {
    console.log(values)
}