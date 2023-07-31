import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Base_Img } from "redux/BaseImg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function Product() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query, locale } = router;
  const Ads = useSelector((state) => state.ad_list);
  const Page = useSelector((state) => state.ad_pagination);
  const { t } = useTranslation();
  console.log(Ads);
  React.useEffect(() => {
    dispatch({
      type: "ADD_LIST",
      payload: { id: query.id, take: 20, page: 1 },
    });
  }, [query?.id]);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
      >
        {Ads?.map((data, i) => {
          const title = JSON.parse(data?.title);
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={data.id}>
              <Card
                sx={{
                  // textAlign: "center",
                  boxShadow: "none",
                  borderRadius: "10px",
                  p: "20px 15px",
                  mb: "15px",
                }}
                key={i}
              >
                {/* <CardMedia
            sx={{ height: 140 }}
            image="/images/contemplative-reptile.jpg"
            title="green iguana"
          /> */}
                <CardMedia>
                  <Swiper
                    sx={{ height: 140 }}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {data?.images?.length ? (
                      data?.images?.map((imge, i) => (
                        <SwiperSlide key={i}>
                          <img
                            src={`${Base_Img}upload/small_images/${imge}`}
                            alt="Image"
                            height={250}
                            width={350}
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <img
                          height={250}
                          width={350}
                          src="/images/alt.jpg"
                          alt="Imag"
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </CardMedia>
                <CardHeader
                  action={
                    data.price == null
                      ? `${
                          data?.price_type != undefined && t(data?.price_type)
                        }`
                      : `KWD ${parseFloat(data?.price)} / ${
                          data?.price_type != undefined && t(data?.price_type)
                        }`
                  }
                  // title="Shrimp and Chorizo Paella"
                  subheader={locale == "en" ? title?.title_en : title?.title_ar}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {data?.description}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    onClick={() => {
                      dispatch({ type: "ADD_DETAIL", payload: data?.id });
                      router.push(`product-details/?id=${data?.id}`);
                    }}
                    size="small"
                  >
                    View Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {Page?.nextPage === null ? (
          " "
        ) : (
          <Button
            onClick={() =>
              dispatch({
                type: "ADD_LIST",
                payload: { id: query.id, take: 20, page: Page?.nextPage },
              })
            }
            variant="contained"
            color="primary"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              mt: "20px",
              color: "#fff !important",
              justifySelf: "center",
            }}
          >
            View More
          </Button>
        )}
      </div>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
