import React, { useEffect } from 'react';
import { Store } from '../../context/dataStore';

const Dash = () => {
  const {getAllOrders} =Store()
  // useEffect(()=>{
  //   getAllOrders()
  // })

  return (
    <div>
      dashbord
    </div>
  );
}

export default Dash;
