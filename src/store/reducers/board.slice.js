import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const BoardSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: [
        ]
    },
    reducers: {
        addBoard: (state, payload) => {
            const { id, name, columns } = payload.payload;

            return {
                ...state,
                boards: [
                    ...state.boards,
                    {
                        id,
                        name,
                        columns
                    }
                ]
            }
            

        },
        editBoard: (state, payload) => {
            const { id, name, columns } = payload.payload;


            const boards = [...state.boards].map(x => {
                if (x.id == id) {
                    return { id, name, columns }
                }
                return x;
            })

            return {
                ...state,
                boards: [
                    ...boards
                ]
            }
        },
        removeBoard: (state, payload) => {
            const { id } = payload.payload;

            const newState = state.boards.filter(x => x.id !== id);
            return {
                ...state, 
                boards: newState
            }
        }

    }
})


export const  { addBoard, editBoard, removeBoard } = BoardSlice.actions;

export default BoardSlice.reducer;