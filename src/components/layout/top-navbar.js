import classes from "../../styles/top-navbar.module.scss";
const TopNavBar = () => {
  return (
    <>
        <nav className={classes['nav-top']}>
            <header>
                <h1>Bergen Dating</h1>
            </header>
            <button className={classes['login-link']}>Logg inn</button>
        </nav>
    </>
  );
};

export default TopNavBar;
