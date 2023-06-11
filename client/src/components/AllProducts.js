import React, { useState, useContext } from 'react';
import '../App.css'
import { UserContext } from './context/User';

function AllProducts({ product }) {
    const options = ["", "phrase", "word", "date"]
    const { currentCustomer, setCurrentCustomer } = useContext(UserContext);
    const productName = product.name.slice(0,1).toUpperCase() + product.name.slice(1, product.name.length)
    const [viewOrderForm, setViewOrderForm] = useState(false)
    const typeOptions = options.map(option => {
        return (<option value={option} key={option}>{option.slice(0,1).toUpperCase() + option.slice(1, option.length)}</option>)
    })
    const [customForm, setCustomForm] = useState({
        custom_type: "",
        personalization: ""
    })
    const {custom_type, personalization} = customForm

    function onViewClick(){
        setViewOrderForm(!viewOrderForm)
    }

    function handleChange(e) {
        setCustomForm({
            ...customForm,
            [e.target.name] : e.target.value
        });
    }

    function handleTypeChange(e) {
        setFormData({
            ...formData,
            [e.target.id] : document.getElementById('type').value
        });
    }

    function onOrder(){

    }

    return (
        <div>
            <div className="productcontainer">
                <img className="productimg" src={product.img} alt={product.name} width="30%" height="30%"/>
                <br/>
                <div className="productform">Custom Handstamped {productName}
                <br/>
                {viewOrderForm == false && currentCustomer ? <button onClick={onViewClick}>Add to Order</button> : null}
                {viewOrderForm ? <div>
                    <form>
                        Customization Type:
                        <br/>
                        <select id="type" onChange={handleTypeChange}>
                            {typeOptions}
                        </select>
                        <br/>
                        Customization:
                        <br/>
                        <input type="text" name="personalization" value={personalization} onChange={handleChange} />
                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div> : null}
                </div>
            </div>
        </div>
    )
}

export default AllProducts;