import classes from "@/styles/Home.module.scss";
import Modal from "@/components/UI/modal";
import { useState } from "react";
import SignUp from "@/components/users/auth/signup";
import SignIn from "@/components/users/auth/signIn";

const LandingPage = (props) => {
  const [isSignUpOpen, setSignUpIsOpen] = useState(false);
  const [isLogInOpen, setLogInIsOpen] = useState(false);
  const [error, setError] = useState(null);
  return (
    <div className={classes["landing-page"]}>
      <nav className={classes["nav-top"]}>
        <header>
          <h1>Bergen Dating</h1>
        </header>
        <button
          onClick={() => setLogInIsOpen(true)}
          className={classes["login-link"]}
        >
          Logg inn
        </button>
      </nav>
   
      <h1 className={classes.title}>Finn Bergensere</h1>
      <button
        onClick={() => setSignUpIsOpen(true)}
        className={classes["btn-signup"]}
      >
        Opprett konto
      </button>
      
      <Modal isOpen={isLogInOpen} setIsOpen={setLogInIsOpen}>
        <SignIn setIsOpen={setLogInIsOpen} />
        <div className={classes.close}></div>
      </Modal>
      <Modal isOpen={isSignUpOpen} setIsOpen={setSignUpIsOpen}>
        <SignUp setIsOpen={setLogInIsOpen} />
        <div className={classes.close}></div>
      </Modal>

   
    </div>
  );
};

export default LandingPage;
