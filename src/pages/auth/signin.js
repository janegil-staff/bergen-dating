import useInput from "@/hooks/use-input";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn({ providers }) {
  const [error, setError] = useState(null);
  
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

      const result = await signIn( "credentials",  {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if(result.error) setError(result.error || 'Noe gikk galt!');
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
      {Object.values(providers).map((provider) => {
        if (provider.name !== "Credentials") {
          return <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>;
        }
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
