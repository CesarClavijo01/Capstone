import { createContext, useState } from "react";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));

    return (
        <AdminContext.Provider value = {{ admin, setAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export {AdminContext, AdminProvider}