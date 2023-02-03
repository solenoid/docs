import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing{' '}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>Provided by your friendly neighborhood Spider-Man!</div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <span className={styles.card}>
          <h2>Docsify Aggregator</h2>
          <p>Coming soon.</p>
        </span>
      </div>
    </main>
  )
}
