


import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

import { clsx } from 'clsx';
import styles from '../home/Home.module.css';


export default function MintContractDemo() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000); // Display confetti for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-10 gap-16 lg:my-20 lg:flex">
      {showConfetti && <Confetti />}
      <div className="flex-shrink-1 mt-10 w-full flex-grow-0 lg:mt-0">
        <h1 className={clsx(styles.HomeHeaderHeadline, 'font-robotoMono')}>
          CONGRATS 🎉
          <br />
        </h1>
        <p className={styles.HomeHeaderParagraph}>
          You bought merch ONCHAIN!
        </p>
      
      </div>
    </div>
  );
}