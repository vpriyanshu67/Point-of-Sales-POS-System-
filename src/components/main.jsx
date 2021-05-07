import React, { Component } from 'react';
import data from './pos.products.json'
import './main.css';
import images from './images';

import PopupReceipt from './popupReceipt';
class Main extends Component {
    state = {  
       menu : [],
       cart : [{
        "name": "",
        "price": "",
        "category": "",
        "description": "",
        "qty":"1",
        "total" :""
      }],
      total:0,
      vat : 0,
      discount:0,
      finaltotal:0,
      seen: false
      
      
    }


    componentDidMount(){
        const menu = data;
        this.setState({menu});
        this.setState({cart :[]});   
        this.calculateSubTotal(this.state.cart);   
        }
 
        //function to calculate the Subtotal
        calculateSubTotal(cart){
            var sum = 0;
              let subtotal =  cart.reduce((prev, cur) =>{return Number(prev)+ Number(cur.total)},0);
              if (subtotal ==0){
                  subtotal = "";
              }
                     return subtotal;
         }
        // function to calculate the total quantity
         calculateTotalQty(cart){
            var sum = 0;
              let totalqty =  cart.reduce((prev, cur) =>{return Number(prev)+ Number(cur.qty)},0);
              if (totalqty ==0){
                totalqty = "";
              }
                     return totalqty;
         }
        
         //this function is used for pop up window
        togglePop = () => {
            this.setState({
             seen: !this.state.seen
            });
            console.log(this.state.seen);
           };
 
    
    
 
     //this function is used to add the value in cart using + button
     addCart = (menu) => {   
       const i = this.state.cart.findIndex(_item => _item.name === menu.name);
       if (i > -1) {
            this.state.cart[i].qty = this.state.cart[i].qty+ 1;
            this.state.cart[i].total = this.state.cart[i].qty * this.state.cart[i].price;
             this.setState({cart:this.state.cart});
             
        }
       else{      
             const item = {...menu, qty:1, total:menu.price};
             this.state.cart.push(item);
             this.setState({cart:this.state.cart})
             
       }        
     }
     
     //this function is subtract the value from cart using - button
     sub = (menu) =>{
        const i = this.state.cart.findIndex(_item => _item.name === menu.name);
        if (i > -1) {
            if(this.state.cart[i].qty>0){
             this.state.cart[i].qty = this.state.cart[i].qty- 1;
             this.state.cart[i].total = this.state.cart[i].qty * this.state.cart[i].price;
              this.setState({cart:this.state.cart});
             
            }
            else
            {
                this.state.cart[i].qty = 0;
                this.state.cart[i].total = 0;
                
            }
        }

     }

     //this function is   used to add value in cart by click on image
     add = (menu) =>{
        const i = this.state.cart.findIndex(_item => _item.name === menu.name);
        if (i > -1) {
             this.state.cart[i].qty = this.state.cart[i].qty+ 1;
             this.state.cart[i].total = this.state.cart[i].qty * this.state.cart[i].price;
              this.setState({cart:this.state.cart});
            
        }

     }
     // this function is used for cancelling ll the data
     cancelClick = ()=>{
        const menu = data;
        this.setState({menu});
        this.setState({cart :[]});   
        this.calculateSubTotal(this.state.cart);  
     }

     //this function is used to completely remove the data from cart
     Delete =(menu) =>{
        const cart = this.state.cart.filter(m => m.name !== menu.name);
        this.setState({cart:cart});
     }
     gb
     

    render() {   
        
        //to calculate total, vat, discount
                const subtotal =   this.calculateSubTotal(this.state.cart);
                let quantity = this.calculateTotalQty(this.state.cart);
                 let vat = parseFloat(0.1 * subtotal).toFixed(3);
                 if (vat == 0)
                      vat="";
                 let discount = parseFloat(0.1 * subtotal).toFixed(3);
                    if(discount == 0)
                        discount="";
                 let  finaltotal = Number(subtotal) + Number(vat)+ Number(discount);
                 finaltotal = parseFloat(finaltotal).toFixed(3);
                  if (finaltotal == 0)
                         finaltotal = "";

        
        return (

      
            <React.Fragment>
             <div className = "Box"><h1>Point of Sales(POS Systems)</h1></div>   
            <div className ="container">
                <div className = "column grid1"> 
                    <div className = "cartlist">
                    <table width="100%">
                        <thead>
                        <tr>  <th></th>
			                  <th>PRODUCTS</th>
			                   <th>PRICE</th>
			                   <th>QUANTITY</th>
                               <th>TOTAL</th>
		                </tr>
                        </thead>
                        <tbody >
                        {(this.state.cart.length === 0)?<tr className = "tablebox" ><td rowSpan="4" colSpan="5">THERE ARE NO PRODUCTS</td></tr>:
                             this.state.cart.map((m,index)=><tr className="tablebox1" key={index}>
                                 <td className="tablebox1" ><button onClick = {()=>this.Delete(m)}>X</button></td>
                                 <td className="tablebox1" >{m.name}</td>
                                 <td className="tablebox1" >{m.price}</td>
                                 <td className="tablebox1" ><button onClick = {()=>this.sub(m)}>-</button> <span>{m.qty}</span> <button onClick = {()=>this.add(m)}>+</button></td>
                                 <td className="tablebox1" >{m.total}</td>
                             </tr>)
                               
                           
                           }
                        </tbody>                              
                    </table>
                    </div>
                    <div className="vatsection">
                        <table  width = "100%" className="vatSectionTable">
                        <tbody>
                            <tr height="30px">
                            <td width="100px"  align="left" bgcolor="grey" >Subtotal</td>
                            
                            <td    bgcolor="white" align="left">{subtotal} EUR</td>
                            <td   bgcolor="white" align="right">{quantity} items</td>
                            </tr>
                            <tr height="30px"> 
                            <td align="left" bgcolor="grey" >VAT tax</td>
                            
                            <td bgcolor="white" align="left">10%</td>
                            <td bgcolor="white" align="right">{vat} EUR</td>
                            </tr>
                            <tr height="30px" >
                            <td align="left" bgcolor="grey">Discount</td>
                            
                            <td bgcolor="white" align="left">10%</td>
                            <td bgcolor="white" align="right">{discount} EUR</td>
                            </tr>
                            <tr height="30px">
                            <td align="left" bgcolor="grey">Total</td>
                            
                            <td align="left" bgcolor="white">{finaltotal} EUR</td>
                            <td bgcolor="white"></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div className = "ButtonSection">

                        <span className = "cancel"> <button class = "cnclBtn" onClick = {this.cancelClick}>CANCEL SALE</button> </span> 
                        <span className = "process"> 
                           
                               <button class = "prcsBtn" onClick={this.togglePop.bind(this)}>PROCESS SALE</button>
                               {this.state.seen ? <PopupReceipt
                                closePopup={this.togglePop.bind(this)}
                                onCart={this.state.cart}
                                onSubtotal = {subtotal} 
                                onVat = {vat}
                                onDiscount ={discount}
                                onFinalTotal = {finaltotal}
                                onQuantity = {quantity}
                                /> : null}
                            </span>
                    </div>

                </div>

                <div className = "column grid2">
                {this.state.menu.map((menu, index) =>{
                    let name = String(menu.image).split('.');                   
                   return  <div className="content_img" onClick ={() =>this.addCart(menu)}
                    key={index}
                    style={{float: 'left', margin: 10,  height :"75px", width : "75px" }} 
                    
                    >
                    <img style={{ display: 'block' , height :"75px", width : "75px"}} src = {images[name[0]]} ></img>
                    <p className = "imagename">{menu.name}</p>
                    <div><br></br><p>{menu.price}</p><p>{menu.description}</p></div>
                    </div>
                    }

                )}
                </div>
            </div>
            </React.Fragment>
          );
    }
}
 
export default Main;