import { useCallback, useEffect, useRef } from "react";
import { UIPostMessage, postToFigma } from "./common/msg";
import { useAppState, useDispatch } from "./hooks";

import Flow from "./components/Flow";
import Settings from "./components/Settings";

function App() {
  const dispatch = useDispatch();
  const mainRef = useRef<HTMLDivElement>(null);

  const { initialized } = useAppState();

  const handleMessage = useCallback(
    (msg: UIPostMessage) => {
      false && console.log({ handleMessage: true, msg });

      dispatch({
        type: "UPDATE_FIGMA_DATA",
        payload: {
          ...msg.data.pluginMessage,
        },
      });

      dispatch({
        type: "SET_LOADING",
        payload: {
          loading: false,
        },
      });

      if (!initialized) {
        dispatch({
          type: "SET_INITIALIZED",
        });
      }

      postToFigma({
        type: "notifiy",
        payload: {
          message: "Latest Variables Received",
        },
      });
    },
    [dispatch, initialized]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  // Request data once mounted
  useEffect(() => {
    postToFigma({ type: "refreshFigmaData" });
    console.log(mainRef);
  }, []);

  return (
    <div className="w-full h-screen" ref={mainRef}>
      <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Flow />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="px-6 py-8 w-80 min-h-full bg-base-100 text-base-content">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
