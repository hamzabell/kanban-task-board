import { useState, useEffect } from 'react'
import './App.scss'
import {  createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import MainPage from './pages';
import { debounce } from './utils/debounce';
import { saveState } from './store/browser-storage';


store.subscribe(
  debounce(() => {
    saveState(store.getState());
  })
)



const router = createHashRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/:boardId',
    element: <MainPage />
  }
])


function App() {
  return (
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  )
}

export default App

