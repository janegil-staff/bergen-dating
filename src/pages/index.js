import LandingPage from '@/components/home';
import { getProviders, getSession } from "next-auth/react";

const HomePage = providers => {
  return <LandingPage providers={providers} />;
}

export default HomePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/profile" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
