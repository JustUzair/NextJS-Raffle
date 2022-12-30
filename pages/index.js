import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Raffle | Decentralized Lottery</title>
        <meta name="description" content="Our smart contract lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <LotteryEntrance></LotteryEntrance>
    </div>
  );
}

//https://youtu.be/gyMwXuJrbJQ?t=65572
