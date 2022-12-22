
import { Link } from "react-router-dom";


const Send = () => {

  return (

    <div style={{display:'flex' ,justifyContent:'spaceAround'}}>
    <Link style={{fontSize:'22px'}} to='/sendether'>Send Eth</Link><p style={{color:'white'}}>......</p>
    <Link style={{fontSize:'22px'}}  to='/erc'>Send Erc20</Link>
    

    
    </div>
  );
};

export default Send;
