
import logo1 from './assets/logo1.png'
import logo2 from './assets/logo2.png'
import hero from './assets/hero.jpg'
import {Link } from 'react-router-dom';


function Index(){
        return(
          
    <section class="home">
       
        <div class="home-img">
            <img src={hero} alt=""></img>
        </div>
        <div class="home-content">
            <div className="lg">
            <img className="lg1" src={logo1}></img>
            <img className="lg2" src={logo2}></img>
            </div>
            <h1 className="slogan1">Give your looks</h1>
            <h3 class="typing-text">A new Style </h3>
            <p className="slogan2">Express your Luxury Personality with <span>OPELMATE</span></p>
            
            <Link to="/Login" className="btn">LOGIN</Link>
        </div>
    </section>
          
            
            
        );
}

export default Index