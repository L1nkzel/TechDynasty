import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Colors, theme } from "../../assets/styles/styles";
import { useGetAllUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AlertBox from "../AlertBox";

const ManageUsersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: users, isLoading, refetch } = useGetAllUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [open, setOpen] = useState(false);

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

  if (isLoading || !users) {
    return <div>Loading...</div>; // Render loading indicator
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setOpen(false);
      refetch();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ mt: 2.5 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User#</TableCell>
                {isSmallScreen && (
                  <>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">isAdmin</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: any) => (
                  <TableRow
                    key={user._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        maxWidth: { xxs: "30px", sm: "60px", md: "80px" },
                        overflow: "hidden",
                      }}
                    >
                      <Link to={`/order/${user._id}`}>
                        <Typography fontSize={{ xxs: 12, md: 14 }}>
                          {user._id}
                        </Typography>
                      </Link>
                    </TableCell>
                    {isSmallScreen && (
                      <>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {user.name}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {user.email}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: { xxs: 12, md: 14 } }}
                        >
                          {user.isAdmin ? (
                            <CheckIcon color="success" />
                          ) : (
                            <CloseIcon color="error" />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            component={Link}
                            to={`/admin/user/${user._id}/edit`}
                          >
                            <Tooltip title="Details">
                              <ManageAccountsIcon />
                            </Tooltip>
                          </IconButton>
                         <AlertBox
                            text={"Are you sure you want to delete this user?"}
                            open={open}
                            setOpen={setOpen}
                            deleteHandler={handleDelete}
                            id={user._id}
                          />
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
                  count={users?.length}
                  rowsPerPage={rowsPerPage}
                  labelRowsPerPage=""
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    bgcolor: Colors.highlight,
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

export default ManageUsersTable;
