import {createSelector} from 'reselect'
const productSelector=state=>state.category.productData;
const productCountSelector=state=>state.category.productCount
export const hasProducts=createSelector(
productSelector,
productCountSelector,
(productData,productCount)=>productData.length<productCount,
);
