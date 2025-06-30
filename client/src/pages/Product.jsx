import axios from 'axios';
import Cookies from 'js-cookie';

import { usePageUpdate } from '../contexts/PageContext';
import { useUser } from '../contexts/UserContext'

import LoginSignUp from './LoginSignUp';
import Settings from './Settings';
import Dashboard from './Dashboard'

function Spec({ spec, value }) {
    return <div className="py-5 border-b-[1px] border-[#e1e1e1] pr-4">
        <div className="text-[14px] leading-[21px] text-[#627177]">{spec}</div>
        <div className="text-[14px] leading-[21px]">{value}</div>
    </div>
}

export default function Product({ product }) {
    const setPage = usePageUpdate();
    const user = useUser()
    return (
        <div className="px-10 py-8 grid grid-cols-10 gap-[46px]">
            <div className="col-span-7">
                <img className="w-full h-1/4 object-cover rounded-xl mb-9" src={product.image} alt="product-image" />
                <h1 className="text-[32px] leading-10 font-bold mb-3">{product.name} {product.shortDescription ? " - " + product.shortDescription : ""}</h1>
                <p className="text-base mb-8">{product.longDescription}</p>
                {product.specs && <>
                <h3 className="font-bold text-[22px] leading-[28px] pb-7 border-b-[1px] border-[#e1e1e1]">Specs</h3>
                <div className="grid grid-cols-2 mb-6">
                    {Object.entries(product.specs).map(([spec, value]) => <Spec spec={spec} value={value} />)}
                </div>
                </>}
                <button onClick={() => {
                    if (!user) {
                        alert("Login or Sign Up to start renting.")
                        setPage(<LoginSignUp />)
                    } else if (!user.bankConnected) {
                        alert("Connect bank account to start renting.")
                        setPage(<Settings />)
                    } else if (!product.available) {
                        alert("This product is not available for rent at the moment.")
                    } else {
                        axios.post("http://localhost:3001/rent", {
                            productId: product._id
                        }, {
                            headers: {
                                Authorization: Cookies.get("accessToken")
                            }
                        })
                        .then(response => {
                            if (response.success) {
                                alert("Product avaiable to get at: Via L'isola che non esiste 31, Torino TO, the rental will start when the admin confirms the get of the product.")
                                setPage(<Dashboard />)
                            }
                        })
                        }
                }} className="w-6/10 bg-[#338AE5] rounded-xl text-white text-base font-bold py-3">Rent now</button>
            </div>
            <div className="col-span-3">
                <div className="flex justify-between items-start mb-9">
                    <div>
                        <h4 className="text-[14px] leading-[21px] text-[#627177]">{product.shortDescription}</h4>
                        <h3 className="text-base font-bold">{product.name}</h3>
                        <p className="text-[14px] leading-[21px] text-[#627177]">€{product.price}/day</p>
                    </div>
                    <img className="w-[120px] h-[72px] object-cover rounded-xl" src={product.image} alt="product-image" />
                </div>
                <h5 className="font-medium text-base">Pickup & return</h5>
                <p className="text-[14px] leading-[21px] text-[#627177]">Via L'isola che non esiste 31, Torino TO</p>
            </div>
        </div>
    );
}