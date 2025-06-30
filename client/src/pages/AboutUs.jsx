import { use } from "react";
import { usePageUpdate } from '../contexts/PageContext';

export default function AboutUs() {
  const setPage = usePageUpdate();
    return (
        <div className="mx-[160px] my-[20px] pb-3">
            <h1 className="p-4 text-[32px] leading-10 font-bold">About Us</h1>
            <div className="p-4">
                <p className="text-base">Hi! I'm Bawer, and I created this platform as my high school graduation project to showcase my skills as a Full-Stack Web Developer.<br />
This project is more than just a school assignment—it's a fully functional platform where users can rent bikes, sports equipment, and gaming consoles easily and securely. From designing the user interface to building the backend and managing the database, I developed every part of this application to demonstrate what I've learned and what I'm passionate about.<br />
My goal was to create a smooth and user-friendly rental experience while exploring real-world web development challenges. Whether you're looking to rent a bike for the weekend, borrow some gear for your next match, or enjoy a gaming night with friends, this platform has you covered.<br />
Thanks for visiting, and I hope you enjoy using the service as much as I enjoyed building it!</p>
            </div>
        </div>
    );
}