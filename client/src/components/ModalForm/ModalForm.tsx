import { FormControl, FormLabel, FormErrorMessage, NumberInput, Input, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios'
import './ModalForm.css'
import { useNavigate } from 'react-router-dom';

type Product = {
    id_do_produto: number,
    codigo_do_produto: number,
    nome_do_produto: string,
    descricao_do_produto: string,
    preco_do_produto: number,
}

export default function ModalForm() {
    const navigate = useNavigate();
    const [createProductForm, setCreateProductForm] = useState<Product>()
    const [productCode, setProductCode] = useState(0)
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [productPrice, setProductPrice] = useState(0)

    // Handlers (vai habilitar edição em tempo real dos inputs)
    const handleProductNameInputChange = (e: any) => {setProductName(e.target.value)}
    const handleProductCodeInputChange = (e: any) => setProductCode(e.target.value)
    const handleProductDescriptionInputChange = (e: any) => setProductDescription(e.target.value)
    const handleProductPriceInputChange = (e: any) => setProductPrice(e.target.value)
    
    // [CREATE]
    const createProduct = async (e: any) => {
        e.preventDefault()
        const newProduct = {
            id_do_produto: productCode,
            nome_do_produto: productName,
            codigo_do_produto: productCode,
            descricao_do_produto: productDescription,
            preco_do_produto: productPrice
        }
        setCreateProductForm(newProduct)
        try {
            await axios.post('http://localhost:3333/products', newProduct)
        } catch (error) {
            console.log(error)
        }
        return navigate('/products');
    }

    // Necessário para verificar se os campos estão vazios com os componentes Chakra
    const isProductNameError = productName === ''
    const isProductCodeError = productCode === 0
    const isProductDescriptionError = productDescription === ''
    const isProductPriceError = productPrice <= 0

    return (
        <form onSubmit={createProduct}>
            <h2 className="form-header">
                <div className="header-desc">
                    Cadastrar novo produto
                </div>
            </h2>
            <FormControl className="form-control" isInvalid={isProductCodeError} isRequired={true}>
                <FormLabel>Código do produto</FormLabel>
                <Input type='text' value={productCode} onChange={handleProductCodeInputChange} />
                {!isProductCodeError ? (
                    ''
                ) : (
                    <FormErrorMessage>É necessário preencher este campo.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl className="form-control" isInvalid={isProductNameError} isRequired={true}>
                <FormLabel>Nome do produto</FormLabel>
                <Input type='text' value={productName} onChange={handleProductNameInputChange} />
                {!isProductNameError ? (
                    ''
                ) : (
                    <FormErrorMessage>É necessário preencher este campo.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl className="form-control" isInvalid={isProductDescriptionError} isRequired={true}>
                <FormLabel>Descrição do Produto</FormLabel>
                <Input type='text' value={productDescription} onChange={handleProductDescriptionInputChange} />
                {!isProductDescriptionError ? (
                    ''
                ) : (
                    <FormErrorMessage>É necessário preencher este campo.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl className="form-control" isInvalid={isProductPriceError} isRequired={true}>
                <FormLabel>Preço</FormLabel>
                <NumberInput min={0}>
                    <NumberInputField value={productPrice} onChange={handleProductPriceInputChange} />
                </NumberInput>
                {!isProductPriceError ? (
                    ''
                ) : (
                    <FormErrorMessage>É necessário preencher este campo.</FormErrorMessage>
                )}
            </FormControl>
            <button
                className="submit-button" 
                type="submit" 
            >
                    <span className="material-symbols-outlined">
                            done
                    </span>
                     Salvar alterações
            </button>
    
        </form>
    )
}