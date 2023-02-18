import BottomNavBar from "./bottom-nav";

const Layout = (props) => {
  const { session } = props;

  return (
    <>
   
      <main>{props.children}</main>

      {session && <BottomNavBar />}
    </>
  );
};

export default Layout;
