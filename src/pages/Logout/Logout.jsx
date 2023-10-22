import { useEffect } from "react";
import styles from "./Logout.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logUserOut());
  }, []);
  return (
    <div className={styles.Logout}>
      <h1>Logging out...</h1>
    </div>
  );
}
