import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user || !user.signed) {
      router.push("/authentication"); 
    }
    else {
      router.push('/');
    }
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
