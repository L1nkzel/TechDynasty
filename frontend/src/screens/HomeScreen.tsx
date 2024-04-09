import {
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Product from "../components/Product";
import {
  useGetProductsQuery,
  useGetPopularProductsQuery,
} from "../slices/productsApiSlice";
import Message from "../components/Message";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import { ProductType } from "../types";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { CustomArrowProps } from "react-slick";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Colors } from "../assets/styles/styles";
import { Link } from "react-router-dom";

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <Box {...props}>
    <ArrowCircleRightIcon
      sx={{
        color: Colors.primaryLight,
        "&:hover": { color: "black" },
      }}
    />
  </Box>
);

// Custom Previous Arrow Component
const PrevArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <Box {...props}>
    <ArrowCircleLeftIcon
      sx={{
        color: Colors.primaryLight,
        "&:hover": { color: "black" },
      }}
    />
  </Box>
);

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  const {
    isLoading: isLoadingLatest,
    error,
    data: products,
  } = useGetProductsQuery({}) as {
    isLoading: boolean;
    error: any;
    data: ProductType[];
  };

  const {
    isLoading: isLoadingPopular,
    error: errorPopular,
    refetch,
    data: popularProducts,
  } = useGetPopularProductsQuery({}) as {
    isLoading: boolean;
    error: any;
    refetch: () => void;
    data: ProductType[];
  };
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (products) {
      const filteredProducts = products
        .filter((product) => product.createdAt !== undefined)
        .sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
      setLatestProducts(filteredProducts);
    }
  }, [products]);

  const sortByLatest = (products: ProductType[]) => {
    return products
      .filter((product) => product.createdAt !== undefined)
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
  };

  useEffect(() => {
    if (!isLoadingLatest && !isLoadingPopular) {
      setLoading(false);
    }
  }, [isLoadingLatest, isLoadingPopular]);

  return (
    <Box
      sx={{
        minHeight: "82vh",
        p: 1,
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            mb={4}
            mt={2}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 18, sm: 20, md: 22 },
                  color: Colors.primaryLight,
                }}
                margin={2}
              >
                Latest Products
              </Typography>
              <Box
                sx={{ flexGrow: 1, borderBottom: "1px solid #ccc", mr: 2 }}
              />
              <Box component={Link}></Box>
            </Box>
            <Grid
              container
              maxWidth={"xl"}
              margin={"auto"}
              justifyContent={"center"}
              rowSpacing={3}
            >
              <Grid item xs={10} sm={11} md={11} lg={11} xl={11}>
                <Slider
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                  dots={true}
                  dotsClass="slick-dots slick-thumb"
                  infinite={true}
                  speed={1000}
                  slidesToShow={5}
                  slidesToScroll={5}
                  responsive={[
                    {
                      breakpoint: 1537,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 900,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false,
                      },
                    },
                  ]}
                >
                  {sortByLatest(latestProducts).map(
                    (product: ProductType, i) => (
                      <Box key={product._id}>
                        <Product product={product} />
                      </Box>
                    )
                  )}
                </Slider>
              </Grid>
            </Grid>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            mb={4}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 18, sm: 20, md: 22 },
                  color: Colors.primaryLight,
                }}
                margin={2}
              >
                Popular Products
              </Typography>
              <Box
                sx={{ flexGrow: 1, borderBottom: "1px solid #ccc", mr: 2 }}
              />
            </Box>
            <Grid
              container
              maxWidth={"xl"}
              margin={"auto"}
              justifyContent={"center"}
              rowSpacing={3}
              columnGap={2}
            >
       <Grid item xs={10} sm={11} md={11} lg={11} xl={11}>
                <Slider
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                  dots={true}
                  dotsClass="slick-dots slick-thumb"
                  infinite={true}
                  speed={1000}
                  slidesToShow={5}
                  slidesToScroll={5}
                  responsive={[
                    {
                      breakpoint: 1537,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 1200,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 900,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: false,
                      },
                    },
                  ]}
                >
                  {popularProducts?.map((product: ProductType) => (
                    <Box key={product._id}>
                      <Product product={product} />
                    </Box>
                  ))}
                </Slider>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomeScreen;
