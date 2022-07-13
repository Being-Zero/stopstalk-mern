import { useDispatch } from "react-redux";
import { RemoveUser } from "../components/redux/UserContext/UserSlice";


const useLogout = () => {
    const dispatch = useDispatch();

    const logout = () => {
        return dispatch(RemoveUser)
    }

    return {
        logout
    }
}

export default useLogout;