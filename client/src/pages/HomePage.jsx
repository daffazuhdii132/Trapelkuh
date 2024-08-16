import { useDispatch, useSelector } from "react-redux";
import CardRuteList from "../components/CardRuteList";
import { getData } from "../store/slice";
import { useEffect } from "react";

function HomePage() {
  return (
    <div style={{ marginTop: 100 }}>
      <CardRuteList />
    </div>
  );
}
export default HomePage;
