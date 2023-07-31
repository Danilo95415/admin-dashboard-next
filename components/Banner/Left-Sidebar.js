import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import styles from "@/components/Apps/FileManager/LeftSidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Base_Img } from "redux/BaseImg";

// Search field style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 100,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 15,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginRight: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#8f2c4f",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "5",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    backgroundColor: "#F5F7FA",
    borderRadius: "30px",
    padding: theme.spacing(1.4, 0, 1.4, 2),
  },
}));

// Storage Status Progress
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#8f2c4f" : "#308fe8",
  },
}));

const LeftSidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "MAIN_CATEGORY" });
  }, []);
  const Main_Category = useSelector((state) => state.main_category);
  const [active, setActive] = useState();

  const first = Main_Category[0];
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      setActive(id);
      dispatch({
        type: "BANNER_CATEGORY",
        payload: { country_id: 109, page: 1, id: id },
      });
    } else {
      if (first != undefined) {
        dispatch({ type: "CHILD_CATEGORY", payload: first?.id });
        router.push(`/banner/banner-category/?id=${first.id}`);
        setActive(first.id);
      }
    }
  }, []);
  const Get_Child = (data) => {
    router.push(`/banner/banner-category/?id=${data.id}`);
    dispatch({
      type: "BANNER_CATEGORY",
      payload: { country_id: 109, page: 1, id: id },
    });
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          p: "25px 20px",
          mb: "15px",
        }}
      >
        <Typography
          as="h1"
          sx={{
            fontSize: 17,
            fontWeight: 500,
            mb: 1,
          }}
        >
          Main Categories
        </Typography>

        {/* Search */}
        <Search className="ls-search-form">
          <SearchIconWrapper className="search-btn">
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search here.."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Nav */}
        <ul className={styles.leftNav}>
          {Main_Category?.map((data, i) => {
            const name = JSON.parse(data?.name);
            return (
              <li key={i} className={data?.id == active ? "activeFMLink" : ""}>
                <Link
                  onClick={() => {
                    setActive(data?.id);
                    Get_Child(data);
                  }}
                  href={`/banner/banner-category/?id=${data.id}`}
                >
                  <img
                    height={35}
                    width={35}
                    src={`${Base_Img}upload/${data.image}`}
                  />
                  {name.name_en}
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
};

export default LeftSidebar;
