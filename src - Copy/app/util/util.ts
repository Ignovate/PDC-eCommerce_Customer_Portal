import { LocalStore } from "../store/local-store";

export class Util {
	
	public static isEmpty(obj){
		return Object.getOwnPropertyNames(obj).length === 0;
	}

	public static buildCartParam(productId, quantity){
		let obj = {
			websiteId: 1,
			productId: productId,
			quantity: quantity,
			customerId: null,
			quoteId: null
		  }
		  if(LocalStore.get("quoteId")) {
				obj["quoteId"] = LocalStore.get("quoteId");
			// Object.defineProperty(obj, "quoteId", LocalStore.get("quoteId"));
		  } else {
				obj["customerId"] = LocalStore.get("userId");
			// Object.defineProperty(obj, "customerId", LocalStore.get("userId"));
		  }
		  return obj;
	}
	
	public static getProductsParam(key, value, name){
		return {
			"key": key,
			"value": value,
			"name": name
		}
	}

	public static getProductParam(categoryId, productId){
		return {
			"categoryId": categoryId,
			"productId": productId
		}
	}
	
}