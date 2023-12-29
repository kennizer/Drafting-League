import Navigation from "./Navigation";
import DraftLayout from "./draft/VersusLayout";

export default function Main (props) {
    return (
        <div className="full flex">
            <Navigation/> 
            <DraftLayout/>
        </div>
    )
}