import { postToFigma } from "../common/msg";
import { useAppState, useDispatch } from "../hooks";

const Settings = () => {
  const dispatch = useDispatch();
  const { loading } = useAppState();

  const handleRefreshClick = () => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
      },
    });
    postToFigma({ type: "refreshFigmaData" });
  };

  return (
    <>
      <h2 className="text-lg pb-6">Settings:</h2>
      <div className=" space-y-4">
        <div>
          <h3>Visable Collections</h3>

          <ul className="menu flex flex-col justify-between">
            {["example"].map((c) => (
              <li key={c} className="form-control w-full">
                <label className="cursor-pointer label">
                  <span className="label-text">{c}</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleRefreshClick}>
            Refresh Figma Variables
            {loading && <span className="loading loading-spinner"></span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
