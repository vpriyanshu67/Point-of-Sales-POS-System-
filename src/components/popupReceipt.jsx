import React, { Component } from 'react';
import './popup.css';
class PopupReceipt extends Component {
    state = {  }

  

    

    render() {

        const {onCart, onSubtotal, onVat, onDiscount,onFinalTotal, onQuantity } = this.props;
        //console.log(onCart);
        //console.log(this.props.onSubtotal);
        //console.log(onVat);
        //console.log(onDiscount);
        //console.log(onFinalTotal);


        var today = new Date(),
        time = today.getDate() + '-' + (today.getMonth() + 1) + '-' +today.getFullYear() +' '+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(); 
        return (
            <div className='popup'>
            <div className='popup_inner'>
               
              <div className ="header"><p>Receipt</p></div>
              <p className ="para">Sale No.....00102</p>
              <p className ="para">Date : {time}</p>
              <div className= "table">
              <table>
                      <thead>
                          <tr>
                              <td>#</td>
                              <td>products</td>
                              <td>Quantity</td>
                              <td>SubTotal</td>
                          </tr>
                      </thead>
                    <tbody>
                       { onCart.map((m , index) => 
                            <tr key ={index}>
                                <td width ="50">{index+1}</td>
                                <td width ="100">{m.name}</td>
                                <td width ="50">{m.qty}</td>
                                <td width ="50">{m.total}</td>
                            </tr>
                        )}
                  </tbody>
                  </table>
                  </div>
                  <div className ="totalSection">
                      <table>
                          <tbody>
                              <tr>
                                  <td width="70">Total Items</td>
                                  <td width ="50">{onQuantity}</td>
                                  <td width ="50">Total</td>
                                  <td width ="80">{onFinalTotal} INR</td>
                              </tr>
                              <tr>
                                  <td></td>
                                  <td></td>
                                  <td>Discount</td>
                                  <td>10%</td>
                              </tr>
                              <tr>
                                  <td></td>
                                  <td></td>
                                  <td>VAT</td>
                                  <td>10%</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
             
              <div className="closebutton">
            <button onClick={this.props.closePopup}>close</button>
            </div>
            </div>
          </div>
        );
       }
      
}
 
export default PopupReceipt;