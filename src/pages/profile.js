import { signOut } from "next-auth/react";
const Profile = (props) => {
  return (
    <>
      <p>Profile</p>
      <button onClick={() => signOut()}>Log ut</button>
    </>
  );
};

export default Profile;