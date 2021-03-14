import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {

  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        
        <input name="name" defaultValue={LoggedInUser.name} placeholder="Enter your name..." ref={register({ required: true })} />
        {errors.name && <span className="error">Name field is required</span>}

        <input name="email" defaultValue={LoggedInUser.email} placeholder="Enter your email..." ref={register({ required: true })} />
        {errors.email && <span className="error">Email field is required</span>}

        <input name="address" placeholder="Enter your address..." ref={register({ required: true })} />
        {errors.address && <span className="error">Address field is required</span>}

        <input name="phone" placeholder="Enter your phone..." ref={register({ required: true })} />
        {errors.phone && <span className="error">Phone field is required</span>}

        <input name="country" placeholder="Enter your country..." ref={register({ required: true })} />
        {errors.country && <span className="error">Country field is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;