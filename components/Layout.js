import {
  AppBar,
  Badge,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Menu,
  MenuItem,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography
} from "@material-ui/core";
import Cookies from "js-cookie";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Store } from "../utilis/Store";
import useStyles from "../utilis/styles";

export default function Layout({ title, description, children }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  //userInfo = JSON.parse((userInfo));

  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
  };

  return (
    <div>
      <Head>
        <title> {title ? `${title} - Next Amazona` : "Next Amazona"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography
                  className={classes.brand}
                  style={{ fontWeight: "bold" }}
                >
                  amazona
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>

            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
            ></Switch>
            <NextLink href="/cart" passHref>
              <Link>
                <Typography style={{ fontWeight: "bold" }}>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Typography>
              </Link>
            </NextLink>

            {userInfo ? (
              <>
                <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                  className={classes.navbarButton}
                >
                  {" "}
                  {userInfo.name}{" "}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Order History
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/admin/dashboard")
                      }
                    >
                      Admin Dashboard
                    </MenuItem>
                  )}

                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            )}
          </Toolbar>
        </AppBar>

        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography style={{ fontWeight: "bold" }}>
            All rights reserved. Next Amazona.
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
