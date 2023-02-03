
import Navbar from "./navbar";

let image = require("../images/home.jpg");

function Home(){

    return(
        <section>
            <Navbar/>
            <br></br>
            <br></br>
            <div class="container">
                <div class="image">
                    <img src={image} alt=""/>
                </div>
                <div class="text">
                    <h2>Manage your property with ease..</h2>
                </div>
            </div>
        </section>
        
    )
}


export default Home;