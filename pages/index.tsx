import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>GitHub Go</title>
        <meta name="description" content="Sample GitHubGo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.nav}>
          <h2>GitHub Go</h2>
          <button className={styles.nav_ham}>
            <span></span>
            <span></span>
            <span></span>
          </button>
      </div>
      <main className={styles.main}>
        <div className={styles.card}>
          <h1>Search By</h1>
          <div>
            <Link href="user"><button className={styles.btn}>Username</button></Link>
            <Link href="urepo"><button className={styles.btn}>Repository and Username</button></Link>
          </div>
        </div> 
        <br/>
      </main>
    </div>
  )
}

export default Home
