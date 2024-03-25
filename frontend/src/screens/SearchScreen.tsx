import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ListItem,
  MenuItem,
  Select,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { ProductType } from "../types";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/shoppingCartSlice";
import { Link, useLocation } from "react-router-dom";
import { Colors, theme } from "../assets/styles/styles";
import Message from "../components/Message";
import { errorDisplayMessage } from "../components/errorDisplayMessage";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import ShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const SearchScreen = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const queryParam = params.get("q");
  const [searchTerm, setSearchTerm] = useState(queryParam || "");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [sortBy, setSortBy] = useState<string>(""); // Default sort by price
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({}) as {
    data: ProductType[];
    isLoading: boolean;
    error: any;
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the searchTerm with the query parameter value
    setSearchTerm(queryParam || "");

    // Filter products based on the searchTerm in URL and product name
    let filtered = products;
    if (queryParam) {
      filtered = products?.filter((product) =>
        product.name.toLowerCase().includes(queryParam.toLowerCase())
      );
    }

    // Sort the filtered products based on the selected sort option

    if (sortBy === "relevance") {
      filtered.sort((a, b) => {
        // Sort by relevance (how closely the product name matches the search term)
        const relevanceA = calculateRelevance(a.name, searchTerm);
        const relevanceB = calculateRelevance(b.name, searchTerm);
        return relevanceB - relevanceA; // Sort in descending order of relevance
      });
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    setFilteredProducts(filtered);
  }, [queryParam, products, sortBy]);

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  // Function to calculate relevance based on string similarity
  const calculateRelevance = (itemName: string, searchTerm: string) => {
    // This is a simplified relevance calculation, you might want to use a more sophisticated approach
    // For example, you can use libraries like string-similarity or implement your own algorithm

    // Here, we're just counting the number of characters from the search term that appear in the item name
    let relevance = 0;
    const itemNameLower = itemName.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    for (let i = 0; i < searchTerm.length; i++) {
      if (itemNameLower.includes(searchTermLower[i])) {
        relevance++;
      }
    }
    return relevance;
  };

  const addToCartHandler = (product: ProductType) => {
    console.log("Product:", product); // Log the product object to inspect it
    dispatch(addToCart({ ...product, qty: 1 })); 
  };

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        mx: { xs: 0, md: 6, lg: 10, xl: 18 },
        bgcolor: "white",
        height: "82vh",
        overflow: "auto",
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Message severity="error">{errorDisplayMessage(error)}</Message>
      ) : (
        <Grid container spacing={2}>
          <Grid item xxs={12}>
            {/* Display the product details */}
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "start",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 600,
                  mt: 3,
                  mb: 1,
                  color: Colors.primary,
                }}
              >
                Search results for "{searchTerm}"
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    ml: 1,
                    color: Colors.primary,
                  }}
                >
                  Showing {filteredProducts?.length} products
                </Typography>
                <Select
                  value={sortBy || "relevance"}
                  size="small"
                  onChange={(e: any) => handleSortChange(e)}
                  variant="outlined"
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="price-asc">Price (low to high)</MenuItem>
                  <MenuItem value="price-desc">Price (high to low)</MenuItem>
                  <MenuItem value="name">Name (a-z)</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </Grid>
              {filteredProducts?.map((product: ProductType, index: number) => (
                <Grid
                  container
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Grid
                    item
                    xxs={12}
                    sm={7}
                    md={5}
                    lg={4}
                    sx={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <Box
                      component={"img"}
                      sx={{ width: 70, height: 50 }}
                      src={product.image}
                      alt={product.name}
                      title={product.name}
                      loading="lazy"
                    />
                    <Typography
                      component={Link}
                      to={`/product/${product._id}`}
                      sx={{
                        textDecoration: "none",
                        fontFamily: "Roboto",
                        fontSize: { xxxs: 14, xxs: 14, xs: 14, sm: 14, md: 16 },
                        fontWeight: 500,
                        color: Colors.title,
                        marginRight: 1,
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Grid>

                  {/* rating of item */}
                  <Grid
                    item
                    xxs={3}
                    md={3}
                    lg={3}
                    sx={{ display: { xxs: "none", md: "flex" }, alignItems: "center" }}
                  >
                    <Rating
                      value={product.rating ?? 0}
                      text={`(${product.numReviews})`}
                      iconFontSize={15}
                    />
                  </Grid>
                  <Grid
                    item
                    xxs={5}
                    xs={7}
                    sm={2}
                    md={1}
                    lg={2}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Tooltip title={product.countInStock === 0 ? "" : "In Stock"}>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: { xxs: 14, sm: 14, md: 16 },
                        ml:{
                          xxs: 2,
                          sm: 0,
                        },
                        fontWeight: 500,
                      }}
                    >
                      {product.countInStock > 0
                        ? `${product.countInStock} pcs`
                        : "Out of Stock"}
                    </Typography>
                    </Tooltip>
                  </Grid>
                  {/* price of item */}
                  <Grid
                    item
                    xxs={7}
                    xs={5}
                    sm={3}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Grid item xxs={12} xs={6} sm={7} >
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: { xxs: 14, sm: 14, md: 16 },
                          fontWeight: 600,
                        }}
                      >
                        ${product.price}
                      </Typography>
                    </Grid>
                    <Grid item xxs={5} xs={5} >
                      <Button
                        disabled={product.countInStock === 0}
                        variant="contained"
                        onClick={() => addToCartHandler(product)}
                        sx={{
                          bgcolor: Colors.secondary,
                          textTransform: "none",
                          gap:1
                        }}
                      >
                        <Typography
                          sx={{
                            display:  { xxs: "none", sm: "none", md: "block" },
                            fontFamily: "Roboto",
                            fontSize: { xxs: 12, sm: 12, md: 13, lg: 14 },
                            fontWeight: 500,
                          }}
                        >
                          Add 
                        </Typography>
                        <ShoppingCartIcon sx={{display: { xxs: "block", sm: "block", md: "block"}, color: "whitesmoke" }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </ListItem>
          </Grid>
        </Grid>
      )}
    </Box>
    </ThemeProvider>
  );
};

export default SearchScreen;
