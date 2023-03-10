import Layout from '@/components/layout';
import Notification from '@/components/notification';
import { store } from '@/redux/store';
import '@/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Notification />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
