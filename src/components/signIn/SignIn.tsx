import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {Authentication} from "../../FireBase/firebase";
import Button from "../subComponent/button/Button";

const Sign = () => {
  const navigate = useNavigate();
  const _OnSubmit = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(Authentication, provider)
      .then((data: any) => {
        console.log(data);
        navigate("/stickyList");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="Signinbtn signin" onClick={_OnSubmit}>
      Sign In with
      <img
        width={20}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
        alt="google"
      />
      {/* <Button
        type="Submit"
        name="Sign In With"
        value="Google Sign In"
      >
        {" "}
       
      </Button> */}
    </div>
  );
};
export default Sign;
