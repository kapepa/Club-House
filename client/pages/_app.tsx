import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import React from "react";
import {wrapper} from "../redux/store";

class MyApp extends React.Component<AppProps> {
  render() {
    const {Component, pageProps} = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);




