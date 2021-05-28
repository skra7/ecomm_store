import React,{useState,useEffect} from "react";
import "./Home.css";
import Banner from '../../UI/commons/Banner/Banner'
import ecomBanner from '../../assets/images/banner.jpg'
import Search from '../Search/Search'
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../Product/Product";
import Grid from "@material-ui/core/Grid";
import * as Categoryaction from "../../store/actions/CategoryAction";
import { connect } from "react-redux";
import CategoryFloat from "../../UI/CategoryFloat/CategoryFloat";
import Card from "../../UI/commons/Card";
import { hasProducts } from "../../store/selectors";
function Home(props) {
  const id = window.location.origin;
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState("");
  const [hasMore, sethasMore] = useState(true);
  React.useEffect(() => {
    if(props.page==1)
     props.onGetCategoryData(id, 10, 1);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.showBackdrop(true);
    setCategory(props.category);

    props.onSetCategory(props.category);
    props.onGetDataByCategory(props.categoryData[0]?.userId,props.category)
  }, [props.category]);
  setTimeout(() => {
    if (!props.productDataloading) {
      props.showBackdrop(false);
    }
  }, 2500);

  setTimeout(() => {
    if (!props.DataByCatloading) {
      props.showBackdrop(false);
    }
  }, 2500);
  const fetchData = () => {
    if (
      !props.productDataloading &&
      props.productData.length < props.productCount
    ) {
      props.onGetCategoryData(id, 10, props.page);
    } else {
      sethasMore(false);
    }
  };

  if (localStorage.getItem("isLogin")) {
    const webUser = JSON.parse(localStorage.getItem("webUser"));
  }
  console.log(props.businessDetails)

  return (
    <div className="home">
      <Banner logo={props.businessDetails?.profilePic} businessName={props.businessDetails?.businessName} delivery={props.businessDetails?.deliveryUpto}/>
      {/* {props.businessDetails?.profilePic ? (
        <img
        style={{
          position: "absolute",
          width: "70px",
          height: "70px",
          objectFit: "fill",
          zIndex: "10",
          left: "0.5em",
          borderRadius: "10px",
          marginTop: "0.5em",
        }}
          alt=""
          src={props.businessDetails?.profilePic}
        />
      ) : null} */}
      <span>
      <h3 style={{position:"absolute",color:'whitesmoke',width:'35%',padding:'10px',fontSize:'14px'}}>ORDER ONLINE. ANYTIME , ANYWHERE</h3>
      <img className="home__image" alt="" src={ecomBanner} />
      </span>

      {/* Category Filter */}
      
      <input type="search" onFocus={props.onFocus}
onBlur={props.onBlur} placeholder="Search Products" className="search" onClick={props.onclick}  onChange={e => setSearchTerm(e.target.value)}/>
     
    
     {searchTerm.length<1? <InfiniteScroll
        dataLength={props.productData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={props.category==="All"?<div style={{textAlign:'center'}}><h4>Loading...</h4></div>:null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      
        <Grid container>
          {props.category === "All" ? (
            props.productData?.map((product) => {
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
            })
          ) : props.DataByCat.length > 0 ? (
            props.DataByCat.map((product) => {
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
              })
          ) : (
            <Grid container>
              <Card />
            </Grid>
          )}
          <CategoryFloat allproducts={props.productData.length} />
        </Grid>
      </InfiniteScroll>:<Search searchTerm={searchTerm}/>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    categoryData: state.category.categoryDataArray,
    categoryDataloading: state.category.categoryDataloading,
    productDataloading: state.category.productDataloading,
    productData: state.category.productData,
    cartData: state.cart.cartData,
    authData: state.auth.authData,
    sellerInfos: state.category.sellerInfo,
    hasProducts: hasProducts(state),
    page: state.category.page,
    productCount: state.category.productCount,
    businessDetails: state.category.businessDetails,
    DataByCat:state.category.DataByCat,
    DataByCatloading:state.category.DataByCatloading,
    DataByCatCount:state.category.DataByCatCount
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategoryData: (id, pagination, page) =>
      dispatch(Categoryaction.getCategoryData(id, pagination, page)),
    onSetCategory: (category) => dispatch(Categoryaction.setcategory(category)),
    onGetDataByCategory:(id,category)=>dispatch(Categoryaction.getDataByCategory(id,category))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
