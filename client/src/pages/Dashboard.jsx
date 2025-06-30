import { usePageUpdate } from '../contexts/PageContext';

export default function Dashboard() {
    const setPage = usePageUpdate();
    return (
        <div className="mx-[160px] my-[20px] pb-3">
            <h1 className="p-4 text-[32px] leading-10 font-bold">Dashboard</h1>
            <div className="p-4">
                <p className="text-base">This page is under construction.</p>
                <p className="text-base">Please check back later for updates.</p>
            </div>
        </div>
    );
}