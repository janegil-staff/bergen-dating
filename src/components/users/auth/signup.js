import { useState } from "react";
import classes from "@/styles/auth.module.scss";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import useInput from "@/hooks/use-input";
import { createUser, signInUser } from "@/helpers/user-auth";
import moment from "moment";

const SignUp = (props) => {
  const { providers } = props;
  const { setIsOpen } = props;
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    value: enteredName,
    isValid: enteredNamesValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => /^[A-Za-z]\w{7,14}$/.test(value.trim()));

  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordIsValidConfirmation,
    hasError: passwordConfirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordConfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput((value) => value === enteredPassword);

  const namenputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordConfirmationInputClasses = passwordConfirmationInputHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await createUser({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        setError,
      });

      if (error) return;

      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if(result.error) setError(result.error || 'Noe gikk galt!');

      router.replace("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        {error && <p className={"error-text"}>{error}</p>}
        <div className={classes["form-group"]}>
          <label htmlFor="name">Brukernavn</label>
          <input
            className={namenputClasses}
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            required
            aria-describedby="nameHelp"
            placeholder="Ola Normann"
          />
          {nameInputHasError && (
            <p className={"error-text"}>Navn feltet må ha innhold</p>
          )}
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="email">E-post</label>
          <input
            className={emailInputClasses}
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
            required
            aria-describedby="emailHelp"
            placeholder="ola@normann.com"
          />
          {emailInputHasError && (
            <p className={"error-text"}>E-post må inneholde @</p>
          )}
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="password">Passord</label>
          <input
            className={passwordInputClasses}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            required
            aria-describedby="paswordHelp"
            placeholder="Velg et pasord"
          />
          {passwordInputHasError && (
            <p className={"error-text"}>
              Passord må inneholed mellom 8-16 tegn, minst en bokstav
            </p>
          )}
        </div>
        <div className={classes["form-group"]}>
          <label htmlFor="passwordConfirmation">Gjenta passord</label>
          <input
            className={passwordConfirmationInputClasses}
            type="password"
            id="password"
            onChange={passwordConfirmationChangeHandler}
            onBlur={passwordConfirmationBlurHandler}
            value={enteredPasswordConfirmation}
            required
            aria-describedby="paswordHelp"
            placeholder="Gjenta pasord"
          />
          {passwordConfirmationInputHasError && (
            <p className={"error-text"}>Må være lik dit valgte pasord</p>
          )}
        </div>
        <p className={classes["full-width"]}>
          <button>Send</button>
        </p>
      </form>

      <div key="Google">
          <button onClick={() => signIn("google")}>
            Sign in with Google
          </button>
        </div>
 
        <div key="Facbook">
          <button onClick={() => signIn("facebook")}>
            Sign in with Facebook
          </button>
        </div>

        <div className={classes.close}></div>
    </>
  );
};

export default SignUp;
