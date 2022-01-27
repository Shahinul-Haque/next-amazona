import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/checkoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utilis/Store";
import useStyles from "../utilis/styles";


export default function Payment() {
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    cart: { shippingAddress },
  } = state;
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if(!paymentMethod){
        alert('Payment Method is required');
        return;
    }else{
        dispatch({
            type:"SAVE_PAYMENT_METHOD",
            payload: paymentMethod
        });

        Cookies.set('paymentMethod',JSON.stringify(paymentMethod));

        router.push('/placeorder');
    }
  };

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="PayPal"
                  value="PayPal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="Stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => router.push("/shipping")}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
