import React from "react";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import styles from "@/styles/PageTitle.module.css";
import Features from "@/components/Dashboard/eCommerce/Features";
import Ratings from "@/components/Dashboard/eCommerce/Ratings";
import AudienceOverview from "@/components/Dashboard/eCommerce/AudienceOverview";
import VisitsByDay from "@/components/Dashboard/eCommerce/VisitsByDay";
import Impressions from "@/components/Dashboard/eCommerce/Impressions";
import ActivityTimeline from "@/components/Dashboard/eCommerce/ActivityTimeline";
import RevenuStatus from "@/components/Dashboard/eCommerce/RevenuStatus";
import SalesByCountries from "@/components/Dashboard/eCommerce/SalesByCountries";
import NewCustomers from "@/components/Dashboard/eCommerce/NewCustomers";
import RecentOrders from "@/components/Dashboard/eCommerce/RecentOrders";
import TeamMembersList from "@/components/Dashboard/eCommerce/TeamMembersList";
import BestSellingProducts from "@/components/Dashboard/eCommerce/BestSellingProducts";
import LiveVisitsOnOurSite from "@/components/Dashboard/eCommerce/LiveVisitsOnOurSite";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function eCommerce() {
  const { t } = useTranslation();
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Order and Sales </h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li></li>
        </ul>
      </div>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          {/* Features */}
          <Features />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12}>
          {/* NewCustomers */}
          <NewCustomers />
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <RecentOrders />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          {/* TeamMembersList */}
          <TeamMembersList />
        </Grid>
      </Grid>
    </>
  );
}
