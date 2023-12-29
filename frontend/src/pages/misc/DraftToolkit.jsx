import './toolkit.css'
export default function DraftToolkit (props) {
    return (<div id="draftToolkit">
        <div id="draftControls">
            &nbsp;
        </div>
        <div id="saveLayout">
            {props.layouts.map((layout, index)=>{
                return (<div className="layoutButton pointer">
                    <div className="centered">
                        {index+1}
                    </div>
                </div>)
            })}
        </div>
        <div className="flex-1"></div>
    </div>)
}