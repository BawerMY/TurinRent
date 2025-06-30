import axios from "axios";

import { useEffect, useState } from "react";

import { usePageUpdate } from '../contexts/PageContext';

import ProductCard from "../components/ProductCard";

export default function LoginSignUp() {
    const setPage = usePageUpdate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(response => {
                setProducts(response.data);
            })
    }, []);
    const bikes = products.filter(product => product.category === "bike");
    const sports = products.filter(product => product.category === "sport");
    const consoles = products.filter(product => product.category === "console");
    return (
        <div className="mx-[160px] my-[20px] pb-3">
            <h1 className="p-4 text-[32px] leading-10 font-bold">Explore our products</h1>
            <h2 className="p-4 pb-2 font-bold text-[18px] leading-[23px]">Bikes</h2>
            <div className="p-4 grid grid-cols-3 gap-3">
                {bikes.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>

            <h2 className="p-4 pb-2 font-bold text-[18px] leading-[23px]">Sports</h2>
            <div className="p-4 grid grid-cols-3 gap-3">
                {sports.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>

            <h2 className="p-4 pb-2 font-bold text-[18px] leading-[23px]">Consoles</h2>
            <div className="p-4 grid grid-cols-3 gap-3">
                {consoles.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
    );

}