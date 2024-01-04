import { useEffect, useState } from "react"
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import axios from "axios"
import './Table.css'

type Product = {
    _id: string, // ID auto-incrementável do Mongo
    id_do_produto: string,
    codigo_do_produto: number,
    nome_do_produto: string,
    descricao_do_produto: string,
    preco_do_produto: number,
}

export default function TableComponent() {
    const [products, setProducts] = useState<Product[]>()
    // [CREATE]
    // Chama o modal de CREATE

    // [READ]
    const fetchProducts = async () => {
        // Busca os produtos pela URL da API 
        const res = await axios.get('http://localhost:3333/products')
        setProducts(res.data)
    }
    // [UPDATE]
    // Chama o modal de Update
    
    // [DELETE]
    const deleteProduct = async (_id: string) => {
        // Deleta o produto escolhido
        await axios.delete(`http://localhost:3333/products/${_id}`)
        // Atualiza o estado 
        const refreshedProductsTable = products?.filter(product => {
            return product._id !== _id
        })
        setProducts(refreshedProductsTable)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <TableContainer className="table-wrapper">
            <Table variant='simple' size='md' className="table">
                <Thead>
                    <Tr>
                        <Th className="th">CÓDIGO DO PRODUTO</Th>
                        <Th className="th">NOME</Th>
                        <Th className="th">DESCRIÇÃO</Th>
                        <Th className="th">PREÇO</Th>
                        <Th className="th">EDITAR</Th>
                        <Th className="th">EXCLUIR</Th>
                    </Tr>
                </Thead>
                <Tbody>
                  
                        {
                            products !== null && products?.map((product) => (
                            
                                    <Tr key={product.codigo_do_produto}>
                                        <Td className="td">{product.codigo_do_produto}</Td>
                                        <Td className="td">{product.nome_do_produto}</Td>
                                        <Td className="td">{product.descricao_do_produto}</Td>
                                        <Td className="td">{product.preco_do_produto}</Td>
                                        <Td  className="td icon-td">
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </Td>
                                        <Td className="td icon-td" onClick={() => deleteProduct(product._id)}> 
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </Td>
                                    </Tr>
                             
                            ))
                        }
                

                </Tbody>
                
            </Table>
        </TableContainer>
       
    )
}