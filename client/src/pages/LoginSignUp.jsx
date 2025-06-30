import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

import { usePageUpdate } from '../contexts/PageContext';
import { useUser, useUserUpdate } from "../contexts/UserContext";

import Store from "./Store";

export default function LoginSignUp() {
    const setPage = usePageUpdate();
    const user = useUser();
    const setUser = useUserUpdate();
    const [isLogin, setIsLogin] = useState(true);
    function switchForm() {
        setIsLogin(!isLogin);
    }
    function handleLogin() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        axios.post("http://localhost:3001/login", { email, password })
            .then(res => {
                Cookies.set("accessToken", res.data.accessToken, { expires: 86400 });
                setUser(res.data.user);
                setPage(<Store />)
                alert("Login successful!");
            })
            .catch(err => {
                alert("Login failed. Please check your credentials.");
            });
        
    }
    function handleSignUp() {
        const name = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone-number").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        axios.post("http://localhost:3001/sign-up", { name, email, phone, password })
            .then(res => {
                Cookies.set("accessToken", res.data.accessToken, { expires: 86400 });
                setUser(res.data.user);
                setPage(<Store setPage={setPage} />)
                alert("Sign up successful!\nLogged in :)");
            })
            .catch(err => {
                alert("Sign up failed. Please check your details.");
            });
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="grid grid-cols-3 gap-4">
                {!isLogin && <>
                    <label className="w-[145px] text-base col-span-1 leading-10" htmlFor="full-name">Full Name: </label>
                    <input className="px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] col-span-2" type="text" id="full-name" />
                </>}
                
                <label className="w-[145px] text-base col-span-1 leading-10" htmlFor="email">Email: </label>
                <input className="px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] col-span-2" type="email" id="email" />
                
                {!isLogin && <>
                    <label className="w-[145px] text-base col-span-1 leading-10" htmlFor="phone-number">Phone Number: </label>
                    <input className="px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] col-span-2" type="text" id="phone-number" />
                </>}
                
                <label className="w-[145px] text-base col-span-1 leading-10" htmlFor="password">Password: </label>
                <input className="px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] col-span-2" type="password" id="password" />
                
                {!isLogin && <>
                    <label className="w-[145px] text-base col-span-1 leading-10" htmlFor="confirm-password">Confirm Password: </label>
                    <input className="px-4 py-2 rounded-xl bg-[#F0F2F5] text-[#3D4D5C] col-span-2" type="password" id="confirm-password" />
                </>}
                <button onClick={() => switchForm()} className="col-start-2 col-span-1 bg-[#e4e7ec] rounded-xl text-[#3D4D5C] text-sm font-bold mt-2.5">{isLogin ? "Sign Up" : "Login"}</button>
                <button onClick={isLogin ? handleLogin : handleSignUp} className="col-start-3 col-span-1 bg-[#338AE5] rounded-xl text-white text-base font-bold py-3">{isLogin ? "Login" : "Sign Up"}</button>
            </div>
        </div>
    );

}