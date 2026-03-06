import React from 'react';
import {
  Facebook,
  Instagram,
  Send,
  Twitter,
  Youtube
} from 'lucide-react';
import styles from '../styles/Footer.module.css';

const columns = [
  {
    title: 'Company',
    items: ['Jobs', 'Categories', 'Blogs', 'Testimonials']
  },
  {
    title: 'Help',
    items: ['Customer Support', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']
  },
  {
    title: 'Resources',
    items: ['Jobs', 'Categories', 'Blogs', 'Testimonials']
  },
  {
    title: 'Resources',
    items: ['Customer Support', 'Contact Us', 'Terms & Conditions', 'Privacy Policy']
  }
];

const logos = [
  { label: 'IROKO', suffix: 'tv', className: 'partnerLogoIroko' },
  { label: 'lendsqr', className: 'partnerLogoLendsqr' },
  { label: 'Interswitch', className: 'partnerLogoInterswitch' },
  { label: 'kuda.', className: 'partnerLogoKuda' },
  { label: 'Gloopro', className: 'partnerLogoGloopro' }
];

function Footer() {
  return (
    <footer className={styles.footerRoot}>
      <div className={styles.partnerBar}>
        <div className={styles.partnerLogos}>
          {logos.map((logo) => (
            <p key={logo.label} className={`${styles.partnerLogoText} ${styles[logo.className]}`}>
              {logo.label}
              {logo.suffix ? <span>{logo.suffix}</span> : null}
            </p>
          ))}
        </div>
      </div>

      <div className={styles.footerContent}>
        <Send aria-hidden className={styles.decorativePlane} />

        <div className={styles.linkColumns}>
          {columns.map((group, index) => (
            <div key={`${group.title}-${index}`} className={styles.linkColumn}>
              <p className={styles.linkColumnTitle}>{group.title}</p>
              <ul className={styles.linkList}>
                {group.items.map((item) => (
                  <li key={item} className={styles.linkItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerBrand}>FIND JOBS</p>
          <p className={styles.footerCopyright}>© Copyright 2024, All Rights Reserved by Findjobs</p>
          <div className={styles.socialLinks}>
            <span className={styles.socialLinkIcon} aria-label="Facebook">
              <Facebook size={11} />
            </span>
            <span className={styles.socialLinkIcon} aria-label="Twitter">
              <Twitter size={11} />
            </span>
            <span className={styles.socialLinkIcon} aria-label="Instagram">
              <Instagram size={11} />
            </span>
            <span className={styles.socialLinkIcon} aria-label="Youtube">
              <Youtube size={11} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
