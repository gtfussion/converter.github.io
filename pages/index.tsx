import styles from "@/styles/Home.module.css";
import { Container } from "@mui/system";
import Head from "next/head";
import ConverterForm from "./components/converterForm";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Token Conversion</title>
        <meta name="description" content="Convert NEP to BUSD" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Container>
          <div className="block-gap">
            <h2 className="title">1 Neptune Mutual Token to Binance USD</h2>
            <h4 className="sub-title">(NEP/BUSD)</h4>
          </div>
          <ConverterForm />
          <p className="bottom-block">
            <span> As for test </span> 1 NEP = 3 BUSD
          </p>
        </Container>
      </main>
    </>
  );
}
