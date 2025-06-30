import Product from "../pages/Product";
import { usePageUpdate } from '../contexts/PageContext';


export default function ProductCard({ product }) {
  const setPage = usePageUpdate();
    return (
        <div onClick={() => setPage(<Product product={product} />)} className="flex flex-col gap-3">
            <div className="aspect-square rounded-xl">
                <img className="w-full aspect-square rounded-xl" src={product.image} alt="product-image" />
            </div>
            <div>
                <h3 className="text-base font-medium">{product.name} {product.shortDescription ? " - " + product.shortDescription : ""}</h3>
                <p className="text-[14px] leading-[21px] text-[#637587]">€{product.price}/day</p>
            </div>
        </div>
    );

}