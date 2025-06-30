import { useUser, useUserUpdate } from '../contexts/UserContext';
import { usePageUpdate } from '../contexts/PageContext';

import Store from '../pages/Store';
import Dashboard from '../pages/Dashboard';
import AboutUs from '../pages/AboutUs';
import LoginSignUp from '../pages/LoginSignUp';
import Settings from '../pages/Settings';


export default function NavBar() {
  const user = useUser();
  const setUser = useUserUpdate();
  const setPage = usePageUpdate();
  return <nav className='flex items-center justify-between px-10 py-3 border-b-[1px] border-[#E5E8EB]'>
      <h2 onClick={() => setPage(<Store />)} className='text-[18px] leading-[23px] font-bold'>TurinRent</h2>
      <div className='flex items-center justify-between gap-8'>
        <div className='flex items-center gap-9'>
          {/* <button className='text-[14px] leading-[21px] font-bold'>Bikes</button>
          <button className='text-[14px] leading-[21px] font-bold'>Sports</button>
          <button className='text-[14px] leading-[21px] font-bold'>Consoles</button> */}
          <button onClick={() => setPage(<Store />)} className='text-[14px] leading-[21px] font-bold'>Store</button>
          {user && <button onClick={() => setPage(<Dashboard />)} className='text-[14px] leading-[21px] font-bold'>Dashboard</button>}
          <button onClick={() => setPage(<AboutUs />)} className='text-[14px] leading-[21px] font-bold'>About us</button>
        </div>
        {user ? <>
          {/* <button className='rounded-xl bg-[#F0F2F5] p-2.5'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_33)"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.3281 13.7453C16.8945 12.9984 16.25 10.8852 16.25 8.125C16.25 4.67322 13.4518 1.875 10 1.875C6.54822 1.875 3.75 4.67322 3.75 8.125C3.75 10.8859 3.10469 12.9984 2.67109 13.7453C2.44572 14.1318 2.44408 14.6092 2.6668 14.9973C2.88951 15.3853 3.30261 15.6247 3.75 15.625H6.93828C7.23556 17.0796 8.51529 18.1243 10 18.1243C11.4847 18.1243 12.7644 17.0796 13.0617 15.625H16.25C16.6972 15.6244 17.1101 15.3849 17.3326 14.9969C17.5551 14.609 17.5534 14.1317 17.3281 13.7453V13.7453ZM10 16.875C9.20562 16.8748 8.49761 16.3739 8.23281 15.625H11.7672C11.5024 16.3739 10.7944 16.8748 10 16.875V16.875ZM3.75 14.375C4.35156 13.3406 5 10.9437 5 8.125C5 5.36358 7.23858 3.125 10 3.125C12.7614 3.125 15 5.36358 15 8.125C15 10.9414 15.6469 13.3383 16.25 14.375H3.75Z" fill="#121417"/></g><defs><clipPath id="clip0_1_33"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
          </button> */}
          <button onClick={() => setPage(<Settings />)} className='rounded-full w-10 h-10'>
            <img className='rounded-full' src='/images/pp.jpg' alt='pp'></img>
          </button>
        </> : <button onClick={() => setPage(<LoginSignUp />)} className="bg-[#f1f3f2] rounded-xl font-bold text-[14px] leading-[21px] px-4 py-2.5">Sign in</button>}
      </div>
    </nav>
}