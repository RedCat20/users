import React, {ChangeEvent, FC, MouseEvent, useState} from "react";
import styles from './Products.module.scss';
import Button from "../General/Button/Button";

import {
    useAddProductMutation,
    useGetProductByIdQuery,
    useGetProductsQuery,
    useRemoveProductMutation
} from "../../store/api/ProductsAPI";
import Spinner from "../General/Spinner/Spinner";

interface Props {
    title: string;
}

const Products:FC<Props> = ({title}) => {

    const [viewCount, setViewCount] = useState<string>('');
    const [activeId, setActiveId] = useState<string>('');

    //const {data = [], isLoading} = useGetProductsQuery('');
    const {data = [], isLoading} = useGetProductsQuery(viewCount);
    const {data: productData = [], isLoading: productLoading, isError} = useGetProductByIdQuery(activeId);

    const [addProduct, {isError: addError}] = useAddProductMutation();
    const [removeProduct, {isError: removeError}] = useRemoveProductMutation();

    const [newProduct, setNewProduct] = useState('');

    const handleAddProduct = async () => {
        if (!newProduct.trim()) return;

        if (newProduct) {
            //await addProduct({name: newProduct});
            await addProduct({name: newProduct}).unwrap();
            setNewProduct('');
        }
    }

    const removeProductHandler = async (id: number) => {
        if (id) {
            await removeProduct(id);
        }
    }

    console.log(productData)

    return (
        <div className={styles.root}>

            <h1>{title}</h1>

            <div className={styles.addToDoForm}>
                <input value={newProduct} onChange={(e:ChangeEvent<HTMLInputElement>) =>  setNewProduct(e.target.value)} className={styles.addToDoInput}/>
                <Button width={200} text="Add product" onClickCallback={handleAddProduct} />
            </div>

            <h3 style={{textAlign: 'center', marginTop: '40px'}}>Products list</h3>

            <hr style={{marginBottom: '20px'}}/>

            <div className={styles.settings}>
                <div className={styles.countForm}>
                    <span>Count of view products: {' '}</span>
                    <input value={viewCount} onChange={(e:ChangeEvent<HTMLInputElement>) =>  setViewCount(e.target.value)} className={styles.countInput}/>
                </div>

                <div className={styles.countForm}>
                    <span>Show product with id: {' '}</span>
                    <input value={activeId} onChange={(e:ChangeEvent<HTMLInputElement>) =>  setActiveId(e.target.value)} className={styles.countInput}/>
                </div>
            </div>


            <h4 style={{textAlign: 'center', marginTop: '40px'}}>Selected product</h4>


            {!productLoading && !isError && <div className={styles.listItem} style={{display: 'flex', justifyContent: 'center'}}> {productData.id} {' '} - {' '} {productData.name}</div>}

            {isError && <div className={styles.listItem} style={{display: 'flex', justifyContent: 'center'}}> {' '} No item {' '} </div>}

            <hr style={{marginBottom: '20px'}}/>

            <h4 style={{textAlign: 'center', marginTop: '40px'}}>All products</h4>

            {isLoading ? <Spinner/> :
                <>

                    <div className={styles.productsList}>
                        {data?.map((item: { id: number, name: string }) => <div className={styles.listItem} key={item.id}>
                            {item.id} {' '} - {' '} {item.name}
                            <Button onClickCallback={(e: MouseEvent<HTMLButtonElement>) => removeProductHandler(item.id)}>
                                X
                            </Button></div>)
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default Products;