import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.description}>Home</h1>
      <Link href="/about">About</Link>
    </main>
  );
}
