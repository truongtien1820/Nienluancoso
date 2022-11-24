export interface UserState {
    idUser?: any;
    isAdmin?: boolean;
    username: string;
    isLogin: boolean;
    myPosts: string[];
    sex: string;
    email: string;
    phoneNumber: string;
    login?: any;
    register?: any;
    logout?: any;
    posts?: any;
}

export const UserReducer = (state: UserState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("idUser", action.payload.idUser);
            return {
                ...state,
                isLogin: true,
                username: action.payload.username,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                sex: action.payload.sex,
                idUser: action.payload.idUser,
                isAdmin: action.payload.isAdmin,
            };
        case "POSTS":
            return {
                ...state,
                myPosts: action.payload.myPosts,
            };
        case "REGISTER":
            localStorage.setItem("idUser", action.payload.idUser);
            return {
                ...state,
                isLogin: true,
                username: action.payload.username,
                email: action.payload.email,
                phoneNumber: action.payload.phoneNumber,
                sex: action.payload.sex,
                idUser: action.payload.idUser,
                isAdmin: action.payload.isAdmin,
            };
        case "LOGOUT":
            localStorage.removeItem("idUser");
            return {
                isLogin: false,
                username: "",
                email: "",
                phoneNumber: "",
                sex: "",
                idUser: "",
                myPosts: [],
                isAdmin: false,
            };
        default:
            return state;
    }
};