import { useEffect, useState } from "react";
import CardRute from "../components/CardRute";
import apiHelper from "../helpers/apiHelper";

function CardRuteList() {
  const [allData, setAllData] = useState([]);
  async function getData() {
    try {
      let { data } = await apiHelper({
        url: "/fleets",
        method: "get",

        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`,
        // },
      });
      setAllData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {allData.map((data) => {
        return <CardRute data={data} />;
      })}
    </>
  );
}
export default CardRuteList;
