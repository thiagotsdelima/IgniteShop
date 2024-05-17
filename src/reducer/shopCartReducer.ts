import { actions } from "./actions";

interface ShopCartReducerProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  defaultPriceId:string
}

export function shopCartReducer(state:ShopCartReducerProps, action:any){
  switch(action.type){
    case actions.ADD_ITEM: {
      const itemExist = state.shopCartList.filter(item => item.id == action.payload.id)

      if(itemExist.length > 0){
        alert('Este item já existe em sua sacola ;D')
        return {...state}
      }

      return {
        ...state, shopCartList: [...state.shopCartList, action.payload] 
      }
    }

    case actions.REMOVE_ITEM:{
      const newList = state.shopCartList.filter((item) => item.id !== action.payload)
      return{
        ...state, shopCartList: newList
      }
    }
  }
   
  return {...state}
}