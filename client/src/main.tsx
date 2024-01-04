import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Router } from 'react-router-dom'
import App from './App.tsx'
import ModalForm from './components/ModalForm/ModalForm.tsx'
import TableComponent from './components/Table/TableComponent.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      // Rota para retornar a tabela com todos os produtos
      {
        path: '/products',
        element: <TableComponent/>
      },
      // Rota para retornar o modal de criação de produto
      {
        path: '/products/create',
        element: <ModalForm/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
