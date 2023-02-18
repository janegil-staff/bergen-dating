import { useState } from "react";
import {Google, Facebook }from 'react-bootstrap-icons';
import classes from "@/styles/auth.module.scss";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import useInput from "@/hooks/use-input";
import { createUser, signInUser } from "@/helpers/user-auth";

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
      <Form onSubmit={submitHandler}>
        {error && <p className={"error-text"}>{error}</p>}
        <Form.Group controlId="formName">
          <Form.Label htmlFor="username">Brukernavn</Form.Label>
          <input
            className={namenputClasses}
            type="text"
            id="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            required
            aria-describedby="nameHelpBlock"
            placeholder="Ola Normann"
          />
          {nameInputHasError && (
            <Form.Text id="nameHelpBlock" className="text-danger" muted>  
              <p className={"text-danger"}>Navn feltet må ha innhold</p>
            </Form.Text>
          )}
        </Form.Group>
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
            aria-describedby="emailHelpBlock"
            placeholder="ola@normann.com"
          />
          {emailInputHasError && (
            <Form.Text id="nameHelpBlock" muted>  
            <p className="text-danger">E-post må inneholde @</p>
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group ccontrolId="formPassword">
          <Form.Label htmlFor="password">Passord</Form.Label>
          <Form.Control
            className={passwordInputClasses}
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            required
            aria-describedby="paswordHelpBlock"
            placeholder="Velg et pasord"
          />
          {passwordInputHasError && (
            <Form.Text id="nameHelpBlock" muted>  
            <p className={"text-danger"}>
              Passord må inneholed mellom 8-16 tegn, minst en bokstav
            </p>
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formPasswordConfimation">
          <Form.Label htmlFor="passwordConfirmation">Gjenta passord</Form.Label>
          <Form.Control
            className={passwordConfirmationInputClasses}
            type="password"
            id="password"
            onChange={passwordConfirmationChangeHandler}
            onBlur={passwordConfirmationBlurHandler}
            value={enteredPasswordConfirmation}
            required
            aria-describedby="paswordConsfirmHelpBlock"
            placeholder="Gjenta pasord"
          />
          {passwordConfirmationInputHasError && (
            <Form.Text id="paswordConsfirmHelpBlock" muted> 
            <p className={"text-danger"}>Må være lik dit valgte pasord</p>
            </Form.Text>
          )}
        </Form.Group>
          <button className={classes['btn-send']}>Fortsett</button>  
      </Form>
            <hr />
      <div key="Google">
          <Button className={classes['btn-social-google']} onClick={() => signIn("google")}>
            <Google className={classes['social-icon']} /> Registresr med Google
          </Button>
        </div>
 
        <div key="Facbook">
          <Button className={classes['btn-social-facebook']} onClick={() => signIn("facebook")}>
            <Facebook className={classes['social-icon']} /> Registrer med Facebook
          </Button>
        </div>

        <div className={classes.close}></div>
    </>
  );
};

export default SignUp;
