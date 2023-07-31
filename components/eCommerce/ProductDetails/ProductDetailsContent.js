import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "@/components/eCommerce/ProductDetails/ProductDetailsContent.module.css";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Base_Img } from "redux/BaseImg";
import { useTranslation } from "react-i18next";
import { Small_Img } from "redux/BaseImg";

const ProductDetailsContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const { query, locale } = router;
  useEffect(() => {
    dispatch({ type: "ADD_DETAIL", payload: query.id });
  }, [query]);

  const Ad_Detail = useSelector((state) => state.ad_detail);
  const AdUser = useSelector((state) => state.ad_user);
  const Base_Url =
    "https://backend.albaseerdevelopers.com/upload/small_images/";
  const date = new Date(Ad_Detail.created_at);
  let Title;
  let Additional;
  if (Ad_Detail?.title != null) {
    Title = JSON.parse(Ad_Detail?.title);
  }
  if (Ad_Detail?.additional != null) {
    Additional = JSON.parse(Ad_Detail?.additional);
  }

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px",
          mb: "15px",
          maxHeight: "",
        }}
      >
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
        >
          <Grid item xs={12} md={6} lg={4} xl={4}>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="product-img-slider"
            >
              {Ad_Detail?.images?.length ? (
                Ad_Detail?.images?.map((imge, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={Small_Img + imge}
                      alt="Image"
                      // height={500}
                      // width={350}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    // height={250}
                    // width={350}
                    src="/images/alt.jpg"
                    alt="Image"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </Grid>

          <Grid item xs={12} md={12} lg={7} xl={7}>
            <Box>
              <Typography as="h4" fontWeight="500" fontSize="18px" mb="10px">
                {locale == "en" ? Title?.title_en : Title?.title_ar}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: "15px",
                }}
              >
                {/* <StarIcon sx={{ color: "#FFBC2B", fontSize: 18 }} />
                <StarIcon sx={{ color: "#FFBC2B", fontSize: 18 }} />
                <StarIcon sx={{ color: "#FFBC2B", fontSize: 18 }} />
                <StarIcon sx={{ color: "#FFBC2B", fontSize: 18 }} />
                <StarIcon sx={{ color: "#FFBC2B", fontSize: 18 }} /> */}

                <Typography as="h4" fontSize="13px" className="">
                  {date.toLocaleDateString()}
                </Typography>
              </Box>

              <Typography fontSize="15px" fontWeight="500" mb="15px">
                Price:{" "}
                {Ad_Detail?.price == null
                  ? `${
                      Ad_Detail?.price_type != undefined &&
                      t(Ad_Detail?.price_type)
                    }`
                  : `KWD ${parseFloat(Ad_Detail?.price)} / ${
                      Ad_Detail?.price_type != undefined &&
                      t(Ad_Detail?.price_type)
                    }`}
              </Typography>

              <Typography fontSize="14px" mb="15px">
                {Ad_Detail?.description}
              </Typography>

              <ul className={styles.metaTagList}>
                <li>
                  <span>Owner Name :</span> {AdUser?.name}
                </li>
                <li>
                  <span>User Name :</span> {AdUser?.username}
                </li>
              </ul>

              {/* <ul className={styles.socialLink}>
                <li>
                  <span>Share :</span>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="ri-facebook-line"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="ri-twitter-line"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="ri-instagram-line"></i>
                  </a>
                </li>
              </ul> */}

              {/* <Button
                variant="contained"
                startIcon={
                  <ShoppingCartIcon sx={{ color: "#fff !important" }} />
                }
                sx={{
                  p: "10px 25px",
                  color: "#fff !important",
                }}
              >
                Add To Cart
              </Button> */}
            </Box>
          </Grid>
        </Grid>

        {Additional ? (
          <Box mt={2}>
            <Tabs className="product-details-tabs">
              <TabList>
                <Tab>Feature</Tab>
                {/* <Tab>Reviews (3)</Tab> */}
              </TabList>

              <TabPanel>
                {/* ProductDescription */}
                <ProductDescription Additional={Additional} />
              </TabPanel>

              {/* <TabPanel>
              ProductReviews 
              <ProductReviews />
            </TabPanel> */}
            </Tabs>
          </Box>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default ProductDetailsContent;
