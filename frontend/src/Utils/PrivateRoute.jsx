import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RemoveUser, selectIsToken } from "../components/redux/UserContext/UserSlice";
import { isLoggedin } from "../Services/AuthService";

const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();

  const token = useSelector(selectIsToken);

  console.log(token)

  if (!isLoggedin(token)) {
    dispatch(RemoveUser());
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
