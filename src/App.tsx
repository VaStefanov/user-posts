import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { fetchUsers, selectUsersFetched } from "./shared/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

function App() {
  const dispatch = useAppDispatch();
  const isFetched = useAppSelector(selectUsersFetched);

  useEffect(() => {
    if (isFetched) return;
    dispatch(fetchUsers());
  }, [dispatch, isFetched]);
  return <RouterProvider router={router} />;
}

export default App;
