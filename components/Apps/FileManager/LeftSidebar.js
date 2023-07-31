import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Box from "@mui/material/Box";
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
import { Avatar } from "@mui/material";
import Image from "next/image";
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
      dispatch({ type: "CHILD_CATEGORY", payload: id });
      router.replace(`/apps/file-manager/?id=${id}`);
      setActive(id);
    } else {
      if (first != undefined) {
        dispatch({ type: "CHILD_CATEGORY", payload: first?.id });
        router.replace(`/apps/file-manager/?id=${first?.id}`);
        setActive(first?.id);
      }
    }
  }, []);

  const Get_Child = (data) => {
    router.push(`/apps/file-manager/?id=${data.id}`);
    dispatch({ type: "CHILD_CATEGORY", payload: data.id });
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
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search here.."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Nav */}
        <ul className={styles.leftNav}>
          {/* <li
            className={
              router.pathname == "/apps/file-manager" ? "activeFMLink" : ""
            }
          >
            <Link href="/apps/file-manager">
              <i className="ri-folder-line"></i> My Drive
            </Link>

            <ul>
              <li
                className={
                  router.pathname == "/apps/file-manager/assets"
                    ? "activeFMLink"
                    : ""
                }
              >
                <Link href="/apps/file-manager/assets">Assets</Link>
              </li>

              <li
                className={
                  router.pathname == "/apps/file-manager/projects"
                    ? "activeFMLink"
                    : ""
                }
              >
                <Link href="/apps/file-manager/projects">Projects</Link>
              </li>

              <li
                className={
                  router.pathname == "/apps/file-manager/personal"
                    ? "activeFMLink"
                    : ""
                }
              >
                <Link href="/apps/file-manager/personal">Personal</Link>
              </li>

              <li
                className={
                  router.pathname == "/apps/file-manager/templates"
                    ? "activeFMLink"
                    : ""
                }
              >
                <Link href="/apps/file-manager/templates">Templates</Link>
              </li>
            </ul>
          </li>
          */}

          {/* <li
            className={
              router.pathname == "/apps/file-manager/documents"
                ? "activeFMLink"
                : ""
            }
          >
            <Link href="/apps/file-manager/documents">
              <i className="ri-file-text-line"></i> Documents
            </Link>
          </li> */}
          {Main_Category?.map((data, i) => {
            const name = JSON.parse(data?.name);
            return (
              <li key={i} className={data?.id == active ? "activeFMLink" : ""}>
                <Link
                  onClick={() => {
                    setActive(data?.id);
                    Get_Child(data);
                  }}
                  href={`/apps/file-manager/?id=${data.id}`}
                >
                  {/* <i className="ri-image-line"></i> */}
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

          {/*   <li
            className={
              router.pathname == "/apps/file-manager/media"
                ? "activeFMLink "
                : ""
            }
          >
            <Link href="/apps/file-manager/media">
              <i className="ri-image-line"></i>
              <Image
                sx={{ width: 20, height: 20, display: "flex" }}
                src="/images/usa-flags.png"
                className="awatar"
                height={30}
                width={30}
              />
              Media
            </Link>
          </li>

          <li
            className={
              router.pathname == "/apps/file-manager/recents"
                ? "activeFMLink"
                : ""
            }
          >
            <Link href="/apps/file-manager/recents">
              <i className="ri-time-line"></i> Recents
            </Link>
          </li>

          <li
            className={
              router.pathname == "/apps/file-manager/important"
                ? "activeFMLink"
                : ""
            }
          >
            <Link href="/apps/file-manager/important">
              <i className="ri-star-fill"></i> Important
            </Link>
          </li> */}

          {/* <li
            className={
              router.pathname == "/apps/file-manager/trash"
                ? "activeFMLink"
                : ""
            }
          >
            <Link href="/apps/file-manager/trash">
              <i className="ri-delete-bin-line"></i> Trash
            </Link>
          </li> */}
        </ul>

        {/* Storage status */}
        {/* <Box>
          <Typography fontSize="14px" fontWeight="500" mb="5px">
            Storage Status
          </Typography>

          <BorderLinearProgress variant="determinate" value={60} />

          <Typography fontSize="12px" mt="5px" color="#A9A9C8">
            186.5 GB Used of 120 GB
          </Typography>
        </Box> */}
      </Card>
    </>
  );
};

export default LeftSidebar;
