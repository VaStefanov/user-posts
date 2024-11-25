import { Flex, Row } from "antd";
import { useAppSelector } from "../../redux-hooks";
import Loading from "../../shared/components/Loading";
import { selectUsersState } from "../../shared/slices/usersSlice";
import User from "./components/User";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, isLoading } = useAppSelector(selectUsersState);

  if (!users.length && isLoading) {
    return <Loading />;
  }

  if (!users.length) {
    return <Row style={{ padding: "10px" }}>No users</Row>;
  }
  return (
    <Row align="middle" justify="center" style={{ height: "100%" }}>
      <Flex vertical style={{ width: "800px" }}>
        <Link
          to="/tasks"
          className="btn back"
          style={{ display: "flex", alignSelf: "flex-end" }}
        >
          Tasks
        </Link>
        {users.map((user) => {
          return <User user={user} key={`${user.name}-${user.id}`} />;
        })}
      </Flex>
    </Row>
  );
};

export default Users;
