import { signIn } from "next-auth/react";

export const createUser = async (props) => {
  const { sex, birthdate, name, email, password, setError } = props;
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ sex, birthdate, name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    setError(data.message || "Noe gikk galt!");
  }

  return data;
};

export const signInUser = async props => {
  const { type, options, setError } = props;
  const result = await signIn(type, options);

  if(result.error) setError(result.error || 'Noe gikk galt!');

  return result;
};
