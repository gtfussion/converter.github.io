import { getBalance } from "@/utils/web3";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { HeaderTable } from "./table";
declare global {
  interface Window {
    ethereum?: any;
  }
}

const EllipsisTypography = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export type MenuItem = {
  key: string;
  value: string | null;
};

function createData(key: string, value: string): MenuItem {
  return { key, value };
}
const StyledAppBar = styled(AppBar)({
  backgroundColor: " #f9f9f9",
  color: "#0a0a0a",
});

const ConnectButton = styled(Button)({
  width: 200,
  borderRadius: 22,
  background: "#2d8be7",
});
const DisconnectButton = styled(Button)({
  width: 200,
  borderRadius: 22,
  background: "#2d8be7",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const Header = (): JSX.Element => {
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

  const onDisconnect = () => {
    handleCloseUserMenu();
    setDisconnect(true);
  };

  useEffect(() => {
    async function getETHBalance() {
      const ethBalance = await getBalance();
      setBalance(ethBalance);
    }

    getETHBalance();
  }, []);

  const showDetails = address && !disconnect;

  return (
    <StyledAppBar className="header" position="static">
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
                  <HeaderTable rows={rows} column={["Key", "Value"]} />
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
    </StyledAppBar>
  );
};
export default Header;
