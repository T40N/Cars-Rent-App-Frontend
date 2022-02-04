import User from "./User";

const UsersDisplay = (props) => {
  return (
    <>
      {props.usersData ? (
        props.usersData.map((user) => {
          return (
            <>
              <User
                id={user._id}
                name={user.name}
                surname={user.surname}
                email={user.email}
                onDelete={props.onDelete}
              />
            </>
          );
        })
      ) : (
        <h1>No users!</h1>
      )}
    </>
  );
};

export default UsersDisplay;
