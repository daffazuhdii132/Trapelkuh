import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import formatDate from "../helpers/formatDate";
import apiHelper from "../helpers/apiHelper";

function CardTicket({ CardData, getAllTicket }) {
  const style = {
    width: 850,
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    p: 4,
    margin: "auto",
    mb: "20px",
  };
  //MIDTRANS BEGIN
  const handlePayment = async (ticketId, price, status) => {
    // console.log(`masookkk-----------`);
    let { data } = await apiHelper({
      url: "/payment",
      method: "POST",
      data: { ticketId, price },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(data, "<< data");

    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    // window.snap.pay(data.transactionToken, {
    // console.log(window.snap);
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        try {
          console.log("MASUK SUKSES BAYAR");
          let { data } = await apiHelper({
            url: "/ticket",
            method: "put",
            data: { ticketId, status: "paid" },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
          console.log(data);
          getAllTicket();
        } catch (error) {
          console.log(error);
        }
      },
      onPending: function (result) {
        /* You may add your own implementation here */
      },
      onError: function (result) {
        /* You may add your own implementation here */
      },
      onClose: function () {
        /* You may add your own implementation here */
      },
    });
  };
  //MIDTRANS END
  let ticketStatus;
  if (CardData.status === "pending") {
    ticketStatus = "Waiting for payment";
  } else if (CardData.status === "paid") {
    ticketStatus = "Paid";
  }

  return (
    <>
      <div>
        <Box sx={style}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={2}>
              <img
                src={CardData.qrUrl}
                alt=""
                style={{ borderRadius: "10px" }}
              />
            </Grid>
            <Grid xs={5}>
              <Typography gutterBottom variant="h6" component="div">
                {CardData.ticketId}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {CardData.Fleet.Route.From.name} (
                {CardData.Fleet.Route.From.code}) ⮕{" "}
                {CardData.Fleet.Route.To.name} ({CardData.Fleet.Route.To.code})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {CardData.Fleet.code}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(CardData.Fleet.Route.departTime)} ⮕{" "}
                {formatDate(CardData.Fleet.Route.arrivalTime)}
              </Typography>
            </Grid>
            <Grid xs={5} container direction="column" alignItems="flex-end">
              <Typography gutterBottom variant="body1" component="div">
                Status:
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.secondary"
              >
                {ticketStatus}
              </Typography>
              <br />
              {CardData.status === "pending" && (
                <Typography variant="body2" component="div">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handlePayment(CardData.ticketId, CardData.price);
                    }}
                  >
                    Pay
                  </Button>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default CardTicket;
