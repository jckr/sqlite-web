import '@/styles/globals.css'
import { Provider } from "react-redux";
import type { AppProps } from 'next/app'
import wrapper from '@/slices/store'

export default function App({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  const {pageProps} = rest;
  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>);
}

