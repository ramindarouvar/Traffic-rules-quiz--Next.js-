import { Provider } from 'react-redux'
import { store } from './../redux/store';
import MainLayout from './../components/layouts/MainLayout';
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.min.css";
import './../styles/style.scss';
import './../styles/responsive.css';
import './../styles/rtl.css';
import './../styles/css/font-awesome.min.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return(
  <Provider store={store}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>آزمون راهنمایی و رانندگی</title>
    </Head>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"></Script>
  </Provider>
)
}

export default MyApp;
