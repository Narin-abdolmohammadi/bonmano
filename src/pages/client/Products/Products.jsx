import { useEffect, useState } from 'react';
import Input from '../../../components/Input';
import styles from './Products.module.css';

const Products = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setcategory] = useState('');

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();

    console.log('component re-render');
    console.log({
        products, loading
    });

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(res => {
                setProducts(res.products)
                console.log('api call is done:');
                const arr = res.products.map(i => i.category)
                const unique = [...new Set(arr)]
                setCategories(unique.map(i => ({id: i, label: i})))
                setLoading(false)
            })
    }, []);

    const findCategoryById = (id) => {
        // TODO:
        return [].find(item => item.id === id)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!products) {
        return <div>No data</div>
    }

    const filteredProducts = products.filter(item => {
        return item.title.toLowerCase().includes(name.toLowerCase()) &&
                item.price >= price
    })

    return (
        <div className={styles.productsContainer}>
            <div className={styles.productsContent}>
                <h1 className={styles.productsTitle}>Profile Products Page</h1>
                <button className={styles.createButton}>Create Product</button>
                <input 
                    className={styles.searchBox}
                    type="text" 
                    placeholder="by name, description, price, category, or stock" 
                />
            </div>
            <div className={styles.productsList}>
                {filteredProducts.map(item => (
                    <div key={item.id} className={styles.productItem}>{item.title} - {item.price}</div>
                ))}
            </div>
            <div className={styles.productsFooter}>Enjoy your coffee journey! ☕</div>
        </div>
    )
}

export default Products;