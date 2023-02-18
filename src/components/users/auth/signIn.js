import useInput from "@/hooks/use-input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {Google, Facebook }from 'react-bootstrap-icons';
import classes from "@/styles/auth.module.scss";
import { Button, Form } from "react-bootstrap";
const SignIn = (props) => {
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

    if (result.error) { 
      setError(result.error || "Noe gikk galt!");
    } else {
      router.replace("/profile");
    }
    
  };
  return (
    <>
      <h2>Logg deg på</h2>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formEmail">
          <Form.Label htmlFor="email">E-post</Form.Label>
          <Form.Control
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
          <Form.Text id="emailHelpBlock" muted> 
          <p className={"text-danger"}>
              E-post må inneholde @ 
          </p>                     
          </Form.Text>
           )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label htmlFor="password">Passord</Form.Label>
          <Form.Control
            className={passwordInputClasses}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            required
            aria-describedby="passwordHelpBlock"
            placeholder="Velg et pasord"
          />
          {passwordInputHasError && (
          <Form.Text id="passwordHelpBlock" muted>  
            <p className="text-danger">
              Passord må inneholed mellom 8-16 tegn, minst en bokstav
            </p>     
          </Form.Text>
           )}
        </Form.Group>

        <Button type="submit" className={classes['btn-send']}>Fortsett</Button>
      </Form>
      <hr />
      <div key="Google">
        <Button className={classes['btn-social-google']} onClick={() => signIn("google")}><Google className={classes['social-icon']} />Logg inn med google</Button>
      </div>

      <div key="Facbook">
        <Button className={classes['btn-social-facebook']} onClick={() => signIn("facebook")}>
          <Facebook className={classes['social-icon']} /> Logg inn med Facebook
        </Button>
      </div>

      <div className={classes.close}></div>
    </>
  );
};

export default SignIn;
