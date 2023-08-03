import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';


export const TaskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    },
    reducers: {
        addTask: (state, payload) => {
            const { title, description, subtasks, status, boardId, completed } = payload.payload;

            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: uuidv4(),
                        title,
                        description,
                        subtasks,
                        status,
                        boardId,
                        completed
                    }
                ]
            }
        },

        updateTask: (state, payload) => {
            const { id, ...rest} = payload.payload;

            return {
                ...state,
                tasks: state.tasks.map(x => {
                    if (x.id == id) {
                        return { id, ...rest };
                    } 

                    return x;
                })
            }
        },

        removeTask: (state, payload) => {
            const { id } = payload.payload;

            console.log(id)
            const newState = state.tasks.filter(x => x.id !== id);

            console.log(newState)
            return {
                ...state,
                tasks: newState
            }
        },

        changeStatus: (state, payload) => {
            const { taskId, statusId } = payload.payload;

            const selectedTask = state.tasks.filter(x => x.id == taskId)[0];

            const newTaskState = { ...selectedTask, status: statusId };

            return {
                ...state,
                tasks: state.tasks.map(x => {
                    if(x.id == taskId) {
                        return newTaskState;
                    }
                    return x
                })
            }


        },

        toggleSubtask: (state, payload) => {
            const { taskId, subtaskIdx } = payload.payload;

            const task = state.tasks.filter(x => x.id == taskId);

            const newTaskState = task.map(x => ({
                ...x,
                completed: x.completed.includes(subtaskIdx) ? x.completed.filter(x => x !== subtaskIdx) : [...x.completed, subtaskIdx]
            }))[0]



            return {
                ...state,
                tasks: state.tasks.map(x => {
                    if (x.id == taskId) {
                        return newTaskState;
                    }
                    return x;
                })
            }
        }
    }
})


export const  { addTask, removeTask, toggleSubtask, changeStatus, updateTask } = TaskSlice.actions;

export default TaskSlice.reducer;