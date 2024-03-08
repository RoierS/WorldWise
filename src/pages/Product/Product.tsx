import PageNav from '@components/PageNav/PageNav';

import styles from './Product.module.css';

const Product: React.FC = () => {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Embark on a journey with WorldWise, your passport to unparalleled
            adventures across the globe. Whether you're a seasoned traveler or
            just starting your expedition, WorldWise is here to elevate your
            experience. Dive into a world of discovery, where every destination
            holds a story and every moment is a treasure.
          </p>
          <p>Join us and unlock a universe of possibilities with WorldWise.</p>
        </div>
      </section>
    </main>
  );
};

export default Product;
