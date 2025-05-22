import ProductLayoutPage from "@/layout/ClientLayout/ProductLayoutPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const breadcrumbsBusiness = [
    {label: "دانه قهوه اسپرسو جیورنو", link: "/bussiness/products/1"},
    {label: "دانه اسپرسو", link: "/bussiness/products/2"},
    {label: "قهوه اسپرسو", link: "/bussiness/products/3"},
    {label: "محصولات بن‌مانو", link: "/bussiness/products/4"},
    {label: "خانه", link: "/bussiness/products/4"},
];

const SliderDot = ({text, onClick, isSelected}) => (
    <div
        onClick={onClick}
        style={{backgroundColor: isSelected ? "green" : "gray", padding: '4px', color: 'white', borderRadius: '100%', cursor: 'pointer'}}>
        {text}
    </div>
);

const Slider = ({images}) => {
    const [selected, setSelected] = useState(0);

    const handleOnBefore = () => {
        setSelected(selected > 0 ? selected - 1 : images.length - 1);
    };

    const handleOnAfter = () => {
        setSelected(selected < images.length - 1 ? selected + 1 : 0);
    };

    return (
        <div style={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #c9b29b',
            background: '#fffbe7',
            borderRadius: '12px',
            margin: '16px auto'
        }}>
            <div id="selected-image" style={{
                border: '1px solid #a67c52',
                width: '100px',
                height: '100px',
                background: '#f3e9dc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
            }}>
                <img src={images[selected]} alt="" width={100} height={100} style={{borderRadius: '8px'}} />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e7d3b7',
                gap: '4px',
                background: '#f3e9dc',
                borderRadius: '8px',
                marginTop: '8px',
                padding: '4px 8px'
            }}>
                <SliderDot onClick={handleOnBefore} text={"<"} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                }}>
                    {images.map((image, index) => (
                        <SliderDot 
                            key={index}
                            onClick={() => setSelected(index)}
                            text={index+ 1} 
                            isSelected={selected === index} 
                        />
                    ))}
                </div>
                <SliderDot onClick={handleOnAfter} text={">"}  />
            </div>
        </div>
    );
};

const ProductDetailPage = () => { 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/products/${id}`)
                .then(res => res.json())
                .then(res => {
                    setProduct(res.product || res);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <ProductLayoutPage breadcrumbItems={breadcrumbsBusiness}>
            <h1 style={{color:'#6f4e37', fontWeight:'bold'}}>{product.name || product.title}</h1>
            <h2 style={{color:'#a67c52'}}>{product.price}$</h2>
            {product.images && product.images.length > 0 && (
                <Slider images={product.images} />
            )}
            <p style={{marginTop:'16px', color:'#6f4e37'}}>{product.description}</p>
            <p style={{color:'#a67c52'}}>Category: {product.category}</p>
            <p style={{color:'#a67c52'}}>Stock: {product.stock}</p>
        </ProductLayoutPage>
    );
};

export default ProductDetailPage;
// http://localhost:5173/product/3