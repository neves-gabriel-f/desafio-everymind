import { useState, useEffect } from "react"
import axios from "axios"
import './Header.css'
import { Link, useLocation } from "react-router-dom"


export default function Header(){
    const [entries, setEntries] = useState<number | null>(0)
    const location = useLocation();
    const fetchEntries = async () => {
        const res = await axios.get('http://localhost:3333/products')
        setEntries(res.data.length) // .length para retornar a quantidade de objetos encontrados
    }  
    useEffect(() => {
        fetchEntries()
    }, [])

    return(
        
        <header>
            <div className="header-desc">
                <h1 className="title">Produtos</h1>
                <h3 className="all-product-entries">
                    {/* Lógica para mostrar ao usuário caso os dados não sejam puxados da API */}
                    {entries !== null ? `${entries} produtos cadastrados` : 'Nenhum produto cadastrado'} 
                </h3>
            </div>
            <div className="header-input-area">
                {
                    location.pathname === '/products/create' ?
                    (
                        <Link to="/products" className="header-button">
                            <span className="material-symbols-outlined">
                                arrow_back
                            </span>
                            Lista de produtos 
                        </Link>
                    ) 
                    :
                    (
                       
                         <Link to="/products/create" className="header-button">
                         <span className="material-symbols-outlined">
                             add
                         </span>
                         Cadastrar novo produto
                     </Link>
                    )
                    
                }
            </div>
        </header>
    )
}