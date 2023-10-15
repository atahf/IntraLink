import { createContext, useReducer } from 'react';
import { getToken, deleteToken } from '../utils/jwtTools';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { jwtToken: action.payload }
        case 'LOGOUT':
            return { jwtToken: null }
        default:
            return state
    };
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { 
        jwtToken: getToken()
    });
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
};
