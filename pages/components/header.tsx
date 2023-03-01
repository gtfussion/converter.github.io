import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Web3 from "web3";
declare global {
  interface Window {
    ethereum?: any;
  }
}
export type MenuItem = {
  label: string;
  value: string | null;
};
const EllipsisTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

function createData(key: string, value: string) {
  return { key, value };
}

const ConnectButton = styled(Button)({
  width: 200,
  borderRadius: 22,
  background: "#68a3dd",
});
const DisconnectButton = styled(Button)({
  width: 200,
  borderRadius: 22,
  background: "#68a3dd",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000",
    color: "#ffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f5f5f5",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [balance, setBalance] = React.useState<string>("0");
  const { connect, account: address, chainId, ethereum } = useMetaMask();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    if (address) {
      setDisconnect(false);
      handleOpenUserMenu(event);
      return;
    }
    connect();
  };
  const rows = [
    createData("ChainId", chainId ? parseInt(chainId, 16).toString() : ""),
    createData("WalletAddress", address ?? ""),
    createData("Balance", balance ?? ""),
  ];
  // const rows: MenuItem[] = [
  //   { "ChainId",  parseInt(chainId, 16).toString() },
  //   { label: "WalletAddress", value: address },
  // ];
  const onDisconnect = () => {
    handleCloseUserMenu();
    console.log(window.ethereum);
    setDisconnect(true);
    // if (window.ethereum && window.ethereum.disconnect) {
    //   window.etherum.disconnect();
    // }
  };
  useEffect(() => {
    async function getBalance() {
      if (window.ethereum) {
        // Create a new web3 instance using the Metamask provider
        const web3 = new Web3(window.ethereum);
        // Get the current account's address
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const address = accounts[0];
        if (address) {
          // Get the balance of the current account

          const weiBalance = await web3.eth.getBalance(address);
          const ethBalance = web3.utils.fromWei(weiBalance, "ether");
          console.log(ethBalance);
          // Set the balance in state
          setBalance(ethBalance);
        }
      }
    }

    getBalance();
  }, []);
  const showDetails = address && !disconnect;
  return (
    <AppBar className="header" position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container spacing={12}>
            <Grid item xs={9}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ flexGrow: 0 }}>
                <ConnectButton
                  startIcon={showDetails && <FiLogOut />}
                  endIcon={showDetails && <FiChevronDown />}
                  variant="contained"
                  aria-label="Connect to Metamask"
                  onClick={handleButtonClick}
                >
                  {showDetails ? (
                    <EllipsisTypography variant="body1">
                      {address}
                    </EllipsisTypography>
                  ) : (
                    "Connect"
                  )}
                </ConnectButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser && showDetails)}
                  onClose={handleCloseUserMenu}
                >
                  <TableContainer className="wallet-table" component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={3}>
                            Wallet Details
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <StyledTableCell>Key</StyledTableCell>
                          <StyledTableCell align="right">Value</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <StyledTableRow
                            key={row.value || "" + index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <StyledTableCell component="th" scope="row">
                              {row.key}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.value}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={"center"}
                    mt={3}
                  >
                    <DisconnectButton
                      onClick={onDisconnect}
                      startIcon={<FiLogOut />}
                    >
                      Disconnect
                    </DisconnectButton>
                  </Box>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
