import { createSlice } from "@reduxjs/toolkit";



export const AppState = createSlice({
    name: 'appState',
    initialState: {
        theme: 'dark',
        sidebar: true
    },

    reducers: {
        toggleTheme: (state) => {
            const newTheme = state.theme == 'dark' ? 'light' : 'dark';

            state.theme = newTheme;
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        }
    }
});

export const { toggleTheme, toggleSidebar }  = AppState.actions;

export default AppState.reducer;