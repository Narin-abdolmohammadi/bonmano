import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import Modal from "../../../../components/Modal/Modal";
import styles from './ProfileProducts.module.css';

const makeBorderStyleByError = (bool) => ({
    border: '1px solid ' + (bool ? 'red' : 'black'),
    color: 'purple',
    borderRadius: 8,
    margin: '0 4px'
});

const ProductFormManagement = ({ onSubmit, data, onCancel, hideCloseButton = false, cancelButtonText = 'Cancel' }) => {
    const isCreateMode = !data;
    const [error, setError] = useState({
        name: false,
        price: false,
        category: false,
        stock: false
    });

    const [form, setForm] = useState({
        name: data?.name || '',
        description: data?.description || '',
        price: data?.price || '',
        category: data?.category || '',
        stock: data?.stock || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price' || name === 'stock') {
            const numberRegex = /^\d*$/;
            setError(prev => ({ ...prev, [name]: !numberRegex.test(value) }));
            setForm(prev => ({ ...prev, [name]: value }));
        } else if (name === 'name' || name === 'category') {
            setError(prev => ({ ...prev, [name]: value.length < 2 }));
            setForm(prev => ({ ...prev, [name]: value }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCreateMode) {
            fetch('http://localhost:8000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.product) onSubmit(res.product);
                });
        } else {
            fetch(`http://localhost:8000/api/products/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(form)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.product) onSubmit(res.product);
                });
        }
    };

    const isSubmitDisabled = error.name || error.price || error.category || error.stock;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
                style={makeBorderStyleByError(error.name)}
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Product Description"
                style={{ border: '1px solid #ddd', color: 'purple', borderRadius: 8, margin: '0 4px' }}
            />
            <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                style={makeBorderStyleByError(error.price)}
            />
            <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                style={makeBorderStyleByError(error.category)}
            />
            <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                style={makeBorderStyleByError(error.stock)}
            />
            <button className={styles.submitButton} disabled={isSubmitDisabled} type="submit">
                {isCreateMode ? 'create' : 'update'}
            </button>
            {!hideCloseButton && (
                <button type="button" onClick={onCancel} className={styles.cancelButton}>
                    {cancelButtonText}
                </button>
            )}
        </form>
    );
};

const ProfileProducts = () => {
    const {user} = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8000/api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteProduct = (id) => {
        setLoading(true);
        fetch(`http://localhost:8000/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                fetchProducts();
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    if (!user.isAdmin) {
        return <div>You are not authorized to access this page</div>;
    }

    return (
        <div className={styles.container}>
            {deleteProduct && 
                <Modal 
                    onClose={() => setDeleteProduct(false)} 
                    onSubmit={() => {
                        handleDeleteProduct(deleteProduct.id);
                        setDeleteProduct(false);
                    }} 
                    title="Delete Product" 
                    description={`Are you sure you want to delete ${deleteProduct.name}?`}
                />
            }
            {openCreateProductModal && 
                <Modal 
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    title="Create Product" 
                    description={
                        <ProductFormManagement 
                            data={null}
                            onSubmit={(product) => {
                                setProducts([...products, product]);
                                setOpenCreateProductModal(false);
                            }} 
                            onCancel={() => setOpenCreateProductModal(false)} 
                            cancelButtonText="close modal"
                        />
                    }
                />
            }
            {editProduct && 
                <Modal 
                    hideCloseButton={true}
                    hideSubmitButton={true}
                    title="Edit Product" 
                    description={
                        <ProductFormManagement 
                            data={editProduct}
                            onSubmit={() => {
                                fetchProducts();
                                setEditProduct(null);
                            }} 
                            onCancel={() => setEditProduct(null)} 
                            cancelButtonText="close modal"
                        />
                    }
                />
            }
            <h2 className={styles.title}>products management</h2>
            <button className={styles.createButton} onClick={() => setOpenCreateProductModal(true)}>Create Product</button>
            <br />
            <input 
                className={styles.searchBox}
                type="text" 
                placeholder="by name, description, price, category, or stock" 
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <div>Loading...</div> : 
                        products
                            .filter(product => 
                                product.name.includes(search) || 
                                product.description.includes(search) ||
                                product.price.toString().includes(search) ||
                                product.category.includes(search) ||
                                product.stock.toString().includes(search)
                            )
                            .map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button 
                                            className={`${styles.actionButton} ${styles.editButton}`}
                                            onClick={() => setEditProduct(product)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`${styles.actionButton} ${styles.deleteButton}`}
                                            onClick={() => setDeleteProduct(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ProfileProducts; 