import React from "react";
import ProductDetailsContent from "@/components/eCommerce/ProductDetails/ProductDetailsContent";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function ProductDetails() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Product Details</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Product Details</li>
        </ul>
      </div>

      <ProductDetailsContent />
    </>
  );
}
