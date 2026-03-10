import React from 'react';
import styles from "../styles/hero.module.css";
const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Тап, танда, иште! 🚀</h1>
        <p>Эң мыкты вакансиялар жана келечектүү жумуш ушул жерде.</p>
        <div className={styles.stats}>
          <span><b>8</b> Активдүү вакансия</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;