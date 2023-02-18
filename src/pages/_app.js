import Layout from "@/components/layout/layout";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>  
    </SessionProvider>
  );
}
