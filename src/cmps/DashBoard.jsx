import { useSelector } from "react-redux";
import { MyChart } from "./MyChart";

export function DashBoard() {
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading);
    return(
        <section className="dashboard">
            {!isLoading && <MyChart/>}
        </section>
    )
    
}