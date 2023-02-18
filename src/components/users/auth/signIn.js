import useInput from "@/hooks/use-input";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from '@/styles/auth.module.scss';
const SignIn = props => {
  const [error, setError] = useState(null);
  const router = useRouter();
  
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

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.error) setError(result.error || "Noe gikk galt!");
    router.replace('/profile')
  };
  return (
    <>
   <form onSubmit={submitHandler}>
          <div>
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
              placeholder="Enter email"
            />
            {emailInputHasError && (
              <p className={"error-text"}>E-post må inneholde @</p>
            )}
          </div>
          <div>
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
          <button>Send</button>
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

export default SignIn;
