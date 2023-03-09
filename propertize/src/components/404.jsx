

function None(){
    let image = require("../images/logo.png");

    return(
        <section style={{"text-align":"center"}}>
            <h1>404 ERR0R</h1>
            <br/>
            <p>Could not find this page</p>
            <br/>
            <a href="/" class="flex items-center logo-text">
            <img src={image} class="h-6 mr-1 sm:h-9" alt="Logo" width="70"/>
            <span class="self-center  font-semibold whitespace-nowrap dark:text-white ">PROPERTIZE</span>
            </a>
        </section>
    )
}

export default None;