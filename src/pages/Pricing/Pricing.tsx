import PageNav from '@components/PageNav/PageNav';

import styles from './Pricing.module.css';

const Pricing: React.FC = () => {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Unlock access to all premium features and enjoy seamless navigation,
            detailed statistics, and personalized recommendations. Join our
            community of adventurers today!
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
};

export default Pricing;
