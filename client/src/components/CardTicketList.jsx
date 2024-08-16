import { useEffect, useState } from "react";
import CardTicket from "./CardTicket";
import apiHelper from "../helpers/apiHelper";

function CardTicketList() {
  const [ticketList, setTicketList] = useState([]);
  async function getAllTicket() {
    try {
      let { data } = await apiHelper({
        url: "/my-tickets",
        method: "get",

        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data);
      setTicketList(data);
    } catch (error) {
      console.log(error, "ERORORRORORORO");
    }
  }
  useEffect(() => {
    getAllTicket();
  }, []);
  return (
    <>
      {ticketList.map((ticket) => {
        return (
          <CardTicket
            key={ticket.id}
            CardData={ticket}
            getAllTicket={getAllTicket}
          />
        );
      })}
    </>
  );
}
export default CardTicketList;
