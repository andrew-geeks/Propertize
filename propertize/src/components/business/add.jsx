import { Bnav } from "../bnav"

export function Add(){
    return(
        <section>
            <Bnav user={[{name:"test",image:""}]} tabs={[{name:"Add +",value:"addproperty"},{name:"Manage",value:"manage"}]}/>
            <h3>Add Your Property</h3>
            
        </section>

    )
}