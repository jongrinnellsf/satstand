import { clsx } from 'clsx';
import Header from '../../components/header/Header';
import styles from './Home.module.css';
import { useAccount } from 'wagmi';



export default function HomeHeader() {
  const { address } = useAccount();
  


  return (
    <div className={styles.HomeHeader}>
      <div className={styles.HomeHeaderGradient} />
      <Header />
      <div className="flex flex-col items-center justify-center">

        <h1 className={clsx(styles.HomeHeaderHeadline, 'font-robotoMono')}>
          BUY
          <br />
          MERCH
          <br />
          ONCHAIN
          <br />

        </h1>
        <p className={styles.HomeHeaderParagraph}>
          Get discounted merch for holding NFTs
        </p>

        <p className="text-white">
  {address ? "Wallet Connected" : "Wallet Not Connected"}
</p>
        <div>
        </div>

      </div>
    </div>
  );
}
