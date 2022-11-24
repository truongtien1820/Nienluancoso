import React, { createContext, useReducer } from "react";
import { UserReducer, UserState } from "./user-context";

export const UserContext = createContext<UserState>({
    isLogin: false,
    username: "",
    email: "",
    phoneNumber: "",
    sex: "",
    idUser: "",
    myPosts: [],
    isAdmin: false,
});

const initialState: UserState = {
    isLogin: false,
    username: "",
    email: "",
    phoneNumber: "",
    sex: "",
    idUser: localStorage.getItem("idUser") || "",
    myPosts: [],
    isAdmin: false,
};

const UserContextProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const login = (payload: any) => {
        dispatch({ type: "LOGIN", payload });
    };

    const posts = (payload: any) => {
        dispatch({ type: "POSTS", payload });
    };


    const register = (payload: any) => {
        dispatch({ type: "REGISTER", payload });
    };

    const logout = (payload: any) => {
        dispatch({ type: "LOGOUT", payload });
    };

    const contextValues = {
        login,
        posts,
        register,
        logout,
        ...state,
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;