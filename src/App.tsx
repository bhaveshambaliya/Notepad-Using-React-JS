import { useMemo, useState } from "react";
import "./App.css";
import { UserContextProvider } from "./context/context";
import Router from "./router";
import { getData } from "./utility/network/storage";

function App() {
    const [loginUser, setLoginUser] = useState(null);
    const loginDetails = { loginUser, setLoginUser };

    useMemo(() => {
        const userLoginDetails = getData("current");
        if (userLoginDetails) {
            setLoginUser(userLoginDetails["email"]);
        }
    }, []);
    console.log("loginUser", loginUser);
    return (
        <>
            <UserContextProvider value={loginDetails}>
                <Router />
            </UserContextProvider>
        </>
    );
}

export default App;
