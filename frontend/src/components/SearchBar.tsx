import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { ProductType } from "../types";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const { data: products } = useGetProductsQuery({}) as {
    isLoading: boolean;
    error: any;
    refetch: () => void;
    data: ProductType[];
  };

  // Filter products based on search input
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      navigate(`/search?q=${input}`);
      setInput("");
    }
  };

  const handleAutocompleteChange = (event: any, value: any) => {
    if (value && typeof value !== "string") {
      // If the selected value is a product, navigate to its details page
      navigate(`/${value.category}/${value._id}`);
    } else {
      // If the selected value is a string, navigate to a search page with typed letters
      navigate(`/search?q=${input}`);
    }
    setInput("");
  };

  return (
    <Autocomplete
      id="grouped-demo"
      sx={{
        width: { xs: "100%", lg: "60%" },
        borderRadius: 1,
        bgcolor: "white",
        color: "black",
      }}
      freeSolo
      clearOnBlur
      size="small"
      disableClearable
      options={input.trim().length > 1 ? filteredProducts || [] : []} // Set options based on input
      getOptionLabel={(option: string | ProductType) => {
        const product = option as ProductType;
        return product?.name || "";
      }}
      isOptionEqualToValue={(option, value) =>
        (option?.name || "") === (value?.name || "")
      }
      renderOption={(props, product) => (
        <Box component="li" {...props} key={product._id} gap={2}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            style={{ width: "10%", height: "auto" }}
          />
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`$${product.price}`}
          </Typography>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          placeholder="Search products"
          {...params}
          InputProps={{
            ...params.InputProps,
            "aria-label": "search",

            endAdornment: (
              <IconButton
                size="small"
                onClick={handleSearch}
              >
                <Search sx={{ color: "black" }} />
              </IconButton>
            ),
          }}
          onChange={handleInputChange}
        />
      )}
      onChange={handleAutocompleteChange}
    />
  );
};

export default SearchBar;
