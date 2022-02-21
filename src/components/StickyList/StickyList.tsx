import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/context";
import {
  getNoteData,
  logoutUser,
  saveNoteData,
} from "../../utility/network/storage";
import Button from "../subComponent/button/Button";

const StickyList = () => {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState<[]>([]);
  const {loginUser, setLoginUser} = useContext(UserContext);

  useEffect(() => {
    const data = getNoteData(loginUser);
    setNoteList(data);
  }, []);

  const deleteUser = (id: number) => {
    const data = getNoteData(loginUser);
    data.splice(id, 1);
    saveNoteData(loginUser, data);
    setNoteList(data);
  };

  const logoutCurrentUser = () => {
    logoutUser();
    setLoginUser("");
    return navigate("/");
  };

  return (
    <>
      <div className="registration">
        <h1>List of Note</h1>
        <div className="display-flex">
          <a href="/stickyAdd" className="btn">
            Create Note
          </a>
          <button onClick={logoutCurrentUser} className="btn">
            Logout
          </button>
        </div>
        <ul className="note-list">
          {noteList.map((item: any, key: any) => {
            const dateFormat = new Date(item["updated_at"]);
            return (
              <li key={key}>
                <div>
                  <div>
                    {(dateFormat.getHours() % 12) +
                      ":" +
                      dateFormat.getMinutes()}{" "}
                    {dateFormat.getHours() > 12 ? "pm" : "am"}
                  </div>

                  <Link to={`/stickyAdd/${key}`}>{item["title"]}</Link>
                </div>
                <div>
                  <Button name="Delete" type="button" onClick={deleteUser} />
                  <Link to={`/stickyAdd/${key}`} className="btn">
                    Edit
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default StickyList;
