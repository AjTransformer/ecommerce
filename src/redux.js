import {createStore , combineReducers} from 'redux';

// export const state = {
//     item:[]
// }

// export function addItems(items){
//     return{
//         type:"ADD_ITEM",
//         payload:items
//     }
// }

// function reducer(data = state, action) {
//     if (action.type === "ADD_ITEM") {
//         return {
//             ...data,
//             item: [...data.item, action.payload] // Add the new item to the item array
//         };
//     }
//     return data;
// }


// export const store = createStore(reducer);

//------------------------------------------------------
const initialData ={
    products: [],
    cart : []
}

export let menWear = [];
export let jewelery = [];
export let electronics = [];
export let womenWear = [];
var count =0;

export function addToCart(data){
    return{
        type:"ADD_TO_CART",
        payload:data
    }
}

export function addProducts(data){
    return{
        type:"ADD_PRODUCTS",
        payload:data
    }
}

export function findCatagory(data){
    return{
        type:"FIND_CATEGORY",
        payload:data
    }
}

// export function findCatagory(data){
//     return (dispatch) => {
//         data.forEach(product => {
//             dispatch({
//                 type: "FIND_CATEGORY",
//                 payload: product
//             });
//         });
//     }
// }

// category
// cart conatins objects (in form of key value pairs) , so initally above pt A quantity key was not AbortedDeferredError,and at above point B quantity is already present , we are just increasing its value by 1

function productReducer(state=initialData , action){
    if(action.type == "ADD_TO_CART"){
        let itemPresent = false;
        let newCart = state.cart.map(function(i){
            // console.log("state.cart.id ",i.id);
            // console.log("action.payload.id ",action.payload.id);
            if(i.id == action.payload.id){
                // console.log("item alredy present in the cart");
                itemPresent = true;
                i = { ...i, quantity: i.quantity + 1 } 
                                            //    --------(B)
            }
            return i;
        })

        if(!itemPresent){
            // console.log("item added first time in cart");
            action.payload.quantity = 1;          
                                            //    ------(A)
            return{
                products:state.products,
                cart : [...state.cart , action.payload]
            }               
        }else{
            // console.log("item quantity has to increase");
            // console.log("newCart ",newCart)
            // action.payload.quantity = action.payload.quantity+1; 
            return{
                products:state.products,
                cart : newCart
            }             
        }
                      
    }

    if(action.type == "ADD_PRODUCTS"){
        return{
            products:action.payload,
            cart:state.cart
        }
    }

    if(action.type=="FIND_CATEGORY"){

        console.log("action category ",action.payload[count].category);
        if(action.category == "men's clothing"){
            console.log("mens wear");
            menWear.push(action.payload);
        }else if(action.category == "jewelery"){
            console.log("jewelery wear");
            jewelery.push(action.payload);
        }else if(action.category == "electronics"){
            electronics.push(action.payload);
            console.log("electronics");
        }else{
            console.log("women waer");
            womenWear.push(action.payload);
        }
        count++;
    }

    return state
}

const rootReducer = combineReducers({
    product : productReducer
}) 

export const store = createStore(rootReducer);
