
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { useContext, useEffect } from "react";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user)
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser, "from firebase");
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
