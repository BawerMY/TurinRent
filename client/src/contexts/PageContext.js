import { useState, createContext, useContext } from "react";

import Store from "../pages/Store";

const PageContext = createContext();
const PageUpdateContext = createContext();

export function usePage() {
    return useContext(PageContext);
}

export function usePageUpdate() {
    return useContext(PageUpdateContext);
}

export function PageContextProvider({ children }) {
    const [page, setPage] = useState(<Store />);
    return (
        <PageContext.Provider value={page}>
            <PageUpdateContext.Provider value={setPage}>
                {children}
            </PageUpdateContext.Provider>
        </PageContext.Provider>
    );
}