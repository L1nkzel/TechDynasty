import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@emotion/react";
import { TablePagination, Typography, useMediaQuery } from "@mui/material";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Colors, theme } from "../../assets/styles/styles";

const ManageOrdersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const { data: orders, isLoading } = useGetAllOrdersQuery({});

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

  if (isLoading || !orders) {
    return <div>Loading...</div>; // Render loading indicator
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ mt: 2.5 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order#</TableCell>
                {isSmallScreen && (
                  <>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Paid</TableCell>
                    <TableCell align="right">Delivered</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order: any) => (
                  <TableRow
                    key={order._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        maxWidth: { xxs: "30px", sm: "60px" },
                        overflow: "hidden",
                      }}
                    >
                      <Link to={`/order/${order._id}`}>
                        <Typography fontSize={{ xxs: 12, md: 14 }}>
                          {order._id}
                        </Typography>
                      </Link>
                    </TableCell>
                    {isSmallScreen && (
                      <>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {order.createdAt.slice(0, 10)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          ${order.totalPrice}
                        </TableCell>
                        {order.isPaymentCompleted ? (
                          <TableCell
                            align="right"
                            sx={{ fontSize: { xxs: 12, md: 14 } }}
                          >
                            {order.paymentDate.slice(0, 10)}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="right"
                            sx={{ fontSize: { xxs: 12, md: 14 } }}
                          >
                            Not Paid
                          </TableCell>
                        )}
                        {order.isDelivered ? (
                          <TableCell
                            align="right"
                            sx={{ fontSize: { xxs: 12, md: 14 } }}
                          >
                            {order.deliveryDate.slice(0, 10)}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="right"
                            sx={{ fontSize: { xxs: 12, md: 14 } }}
                          >
                            Not Delivered
                          </TableCell>
                        )}
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
                  count={orders?.length}
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
  );
};

export default ManageOrdersTable;
