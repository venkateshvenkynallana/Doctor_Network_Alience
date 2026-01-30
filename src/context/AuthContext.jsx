import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const checkAuth = () => {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                setAuthUser(JSON.parse(savedUser));
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (user) => {
        setAuthUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem('currentUser');
    };

    const value = {
        authUser,
        login,
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContext;
