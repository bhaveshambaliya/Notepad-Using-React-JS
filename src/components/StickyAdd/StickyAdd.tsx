import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../../context/context";
import {
  getNoteData,
  logoutUser,
  saveNoteData,
} from "../../utility/network/storage";
import Button from "../subComponent/button/Button";
import Input from "../subComponent/input/Input";

const StickyAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {loginUser, setLoginUser} = useContext(UserContext);
  const [noteDetails, setNoteDetails] = useState<any>({
    title: "",
    description: "",
    created_at: new Date(),
    updated_at: new Date(),
  });

  const updateDetails = (e: any) => {
    const {name, value} = e.target;
    setNoteDetails({...noteDetails, [name]: value});
  };

  useEffect(() => {
    const id: any = params["id"];
    if (id) {
      const noteData = getNoteData(loginUser);
      const currentNote = noteData[id];
      setNoteDetails({
        ...noteDetails,
        title: currentNote["title"],
        description: currentNote["description"],
      });
    }
  }, []);

  const submit = () => {
    if (noteDetails.title == "" || noteDetails.description == "") {
      alert("Please Enter Something");
      return navigate("/stickyAdd");
    } else {
      const previousData = getNoteData(loginUser);
      if (params["id"]) {
        previousData.splice(params["id"], 1);
      }
      previousData.splice(0, 0, noteDetails);
      saveNoteData(loginUser, previousData);
      navigate("/stickyList");
    }
  };

  const logoutCurrentUser = () => {
    logoutUser();
    setLoginUser("");
    return navigate("/");
  };
  const _StickyList = () => {
    navigate("/stickyList");
  };
  return (
    <>
      <div className="registration">
        <div className="display-flex">
          <h1>NotePad</h1>
          <button onClick={logoutCurrentUser} className="btn">
            Logout
          </button>
        </div>
        <div className="">
          <Input
            name="title"
            label="Title"
            type="text"
            value={noteDetails["title"]}
            placeHolder="Enter title"
            handleEvent={updateDetails}
          />
          <div className="form-control-group">
            <label>Description</label>
            <textarea
              name="description"
              value={noteDetails["description"]}
              onChange={updateDetails}
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="Sticky-add">
            <Button type="submit" onClick={submit}>
              Submit
            </Button>
            <Button onClick={_StickyList} name="Sticky List" />
          </div>
        </div>
      </div>
    </>
  );
};
export default StickyAdd;
