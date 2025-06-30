import axios from 'axios';
import Cookies from "js-cookie"

import { usePageUpdate } from '../contexts/PageContext';
import { useUser, useUserUpdate } from '../contexts/UserContext';

import Store from './Store';

export default function Settings() {
    const setPage = usePageUpdate();
    const user = useUser();
    const setUser = useUserUpdate()
    return (
        <div className="mx-[160px] my-[20px] pb-3">
            <h1 className="p-4 text-[32px] leading-10 font-bold">Settings</h1>
            <div className='flex items-center gap-6'>
                <p>Logged in as {`${user.name} ${ user.surname} ( ${user.email} - ${user.phone} )`}</p>
                <button className='bg-red-600 rounded-xl text-white text-base font-bold py-3 px-6' onClick={() => {
                    Cookies.remove("accessToken");
                    setUser(null);
                    setPage(<Store />);
                }}>Logout</button>
            </div>
            {user.bankConnected ?
            <div className='flex items-center gap-4'>
                <div>Bank Card Connected</div>
                <button className='bg-yellow-500 rounded-xl text-white text-base font-bold py-3 px-6' onClick={() => {
                    axios.post("http://localhost:3001/bank/disconnect-account", {}, {
                        headers: {
                            Authorization: Cookies.get("accessToken")
                        }
                    })
                    .then(response => {
                        if (response.data.success) {
                            setUser({...user, bankConnected: false})
                        }
                    })
                }}>Disconnect Card</button>
            </div> :
            <div className='grid grid-cols-5 gap-2 w-96'>
                <label className='col-span-5'> Card Number
                    <input className='px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] border-[1px] border-black w-full text-2xl' id='card-number' type="text" />
                </label>
                <label className='col-span-3'> Expiration Date
                    <input className='px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] border-[1px] border-black w-full text-2xl' id='expiration-date' type="text" />
                </label>
                <label className='col-span-2'> CVV
                    <input className='px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] border-[1px] border-black w-full text-2xl' id='cvv' type="number" />
                </label>
                <button className='col-span-2 col-start-4 bg-blue-500 rounded-xl text-white text-base font-bold py-3' onClick={() => {
                    axios.post("http://localhost:3001/bank/connect-account", {
                        cardNumber: document.getElementById("card-number").value,
                        expirationDate: document.getElementById("expiration-date").value,
                        cvv: document.getElementById("cvv").value
                    }, {
                          headers: {
                            Authorization: Cookies.get("accessToken")
                          }
                        })
                    .then(response => {
                        if (response.data.success) {
                            setUser({...user, bankConnected: true})
                        }
                    })
                    .catch(err => console.log(err))
                }}>Save Card</button>
            </div>}
        </div>
    );
}