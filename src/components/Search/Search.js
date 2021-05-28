import React,{useState,useEffect} from 'react'
import useDebounce from './useDebounce';
import Grid from "@material-ui/core/Grid";
import Product from "../Product/Product";
import { connect } from "react-redux";
import './Search.css'

const Search=(props)=>{
 
const [results, setResults] = useState([]);
const [isSearching, setIsSearching] = useState(false);
const debouncedSearchTerm = useDebounce(props.searchTerm, 500);
useEffect(() => {
  if (debouncedSearchTerm) {
    const userId=props.categoryData[0]?.userId;
    setIsSearching(true);
   
    searchCharacters(debouncedSearchTerm,userId).then(results => {
      
      setIsSearching(false);
      
      setResults(results);
    });
  } else {
    setResults([]);
  }
}, [debouncedSearchTerm])
   
    
async function searchCharacters(search,id) {

  try {
    const r = await fetch(
      `http://15.207.67.143:4000/supplierProductBySearch?userId=${id}&searchString=${search}`,
      {
        method: 'GET',
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
      }
    );
    const r_1 = await r.json();
    return r_1.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

return(
  <>

   <div>
   
{isSearching && <center><div>Searching ...</div></center>}

{results.length>0?results.map((product) => {
              const filteredCart = props.cartData?.filter(
                (cart) => cart.supplierProductId === product._id
              );
              return (
                <Grid item className="home__row" xs={12}>
                  <Product
                    key={product._id}
                    product={product}
                    cartData={props.cartData}
                    filteredCart={filteredCart}
                  />
                </Grid>
              );
            }): <center><strong><div>No Results Found</div></strong></center>}
    </div>
  </>
  )
}
const mapStateToProps = (state) => {
  return {
    categoryData: state.category.categoryDataArray,
    cartData: state.cart.cartData,
  };
};
export default connect(mapStateToProps,null)(Search);