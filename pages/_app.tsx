import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { DataProvider } from '../context/global';

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <DataProvider>
        <Component {...pageProps} />

      </DataProvider>
    </Provider>
  );
}
