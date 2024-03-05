import React, { useEffect, useState } from 'react'
import { useAddProductMutation, useGetProductsQuery } from '../../slices/productsApiSlice';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { Colors, theme } from '../../assets/styles/styles';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ManageProducts = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: products, isLoading, error } = useGetProductsQuery({});
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    setPage(0); // Reset page when rowsPerPage changes
  }, [rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading || !products) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>Manage Products</Typography>
      <Button component={Link} to="/admin/products/addProduct" sx={{backgroundColor: Colors.primary, color: "whitesmoke", textTransform: "none"  }} variant="contained">
      <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Add Product</Typography>
      </Button>
      </Box>
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ mt: 2.5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product#</TableCell>
              {isSmallScreen && (
                <>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right"></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: any) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      maxWidth: { xxs: "30px", sm: "60px" },
                      overflow: "hidden",
                    }}
                  >
                    <Link to={`/${product.category}/${product._id}`}>
                      <Typography fontSize={{ xxs: 12, md: 14 }}>
                        {product._id}
                      </Typography>
                    </Link>
                  </TableCell>
                  {isSmallScreen && (
                    <>
                      <TableCell
                        align="right"
                        sx={{ fontSize: { xxs: 12, md: 14 } }}
                      >
                        {product.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: { xxs: 12, md: 14 } }}
                      >
                        ${product.price}
                      </TableCell>
                     
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {product.category}
                        </TableCell>
                     
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {product.brand}
                        </TableCell>
                        <TableCell align="right">
                        <IconButton onClick={() => {}} >
                          <EditIcon sx={{ fontSize: { xxs: 14, xs: 16, sm: 18 } }}/>
                        </IconButton>
                        <IconButton onClick={() => {}} sx={{ ml: 1 }}>
                          <DeleteOutlineIcon sx={{ fontSize: { xxs: 14, xs: 16, sm: 18, color: "crimson" } }}/>
                        </IconButton>
                        </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            <TableRow
              sx={{
                "& > td > div": {
                  height: 40,
                  minHeight: 40,
                },
              }}
            >
              <TablePagination
                rowsPerPageOptions={[3, 5, 7]}
                count={products?.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage=""
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  bgcolor: Colors.primaryLight,
                  "& .MuiTablePagination-select, .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                    {
                      fontSize: 12,
                    },
                }}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </ThemeProvider>
  )
}

export default ManageProducts