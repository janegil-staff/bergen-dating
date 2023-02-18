
import LandingPage from '@/components/home';
import { getSession } from 'next-auth/react';

function HomePage() {
  return <LandingPage />;
}

export default HomePage;

export const getServerSideProps = async context => {
  const session = await getSession({req: context.req});

  if(session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: {  }
  }
}