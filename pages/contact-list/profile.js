import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProfileInfo from "@/components/ContactList/ProfileInfo";
import Features from "@/components/ContactList/Features";
import PersonalInformation from "@/components/ContactList/PersonalInformation";
import ActivityTimeline from "@/components/ContactList/ActivityTimeline";
import Overview from "@/components/ContactList/Overview";
import MyTasks from "@/components/ContactList/MyTasks";
import styles from "@/styles/PageTitle.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id) {
      dispatch({ type: "USER", payload: id });
    }
    dispatch({ type: "COUNTRY" });
  }, [id]);
  const User = useSelector((state) => state.user);

  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Profile</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Profile</li>
        </ul>
      </div>

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        <Grid item xs={12} md={12} lg={12} xl={4}>
          {/* ProfileInfo */}
          {/* <ProfileInfo /> */}

          {/* Personal Information */}
          <PersonalInformation Profile={User} />

          {/* ActivityTimeline */}
          <ActivityTimeline />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={8}>
          {/* Features */}
          <Features />

          {/* Overview */}
          <Overview />

          {/* MyTasks */}
          <MyTasks />
        </Grid>
      </Grid>
    </>
  );
}
