import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import convertRupiah from "../helpers/convertRupiah";
import formatDate from "../helpers/formatDate";
import apiHelper from "../helpers/apiHelper";
import { useNavigate } from "react-router-dom";

function CardRute({ data }) {
  console.log(data);
  const navigate = useNavigate();
  const style = {
    width: 850,
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: "10px",
    p: 4,
    margin: "auto",
    mb: "20px",
  };
  async function handleBuy() {
    try {
      console.log(data.id);
      let result = await apiHelper({
        url: "/ticket",
        method: "POST",
        data: { FleetId: data.id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate("/my-tickets");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
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
                src="https://qph.cf2.quoracdn.net/main-qimg-500f9439fcf5d771fe930f670849e490"
                width="75px"
                alt=""
                style={{ borderRadius: "10px" }}
              />
            </Grid>
            <Grid xs={8}>
              <Typography gutterBottom variant="h6" component="div">
                {data.Route.From.name} ({data.Route.From.code}) ⮕{" "}
                {data.Route.To.name} ({data.Route.To.code})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.code}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(data.Route.departTime)} ⮕{" "}
                {formatDate(data.Route.arrivalTime)}
              </Typography>
            </Grid>
            <Grid xs={2} container direction="column" alignItems="flex-end">
              <Typography gutterBottom variant="body1" component="div">
                Price:
              </Typography>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="text.secondary"
              >
                {convertRupiah(data.Route.price)}
              </Typography>
              <br />
              <Typography variant="body2" component="div">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleBuy();
                  }}
                >
                  Buy Ticket
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
export default CardRute;
