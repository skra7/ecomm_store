import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as Categoryaction from '../../store/actions/CategoryAction'
import { connect } from 'react-redux';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import './CategoryFloat.css'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: 'auto',


        },
    },
    button: {
        position: 'fixed',
        color: 'white',
        lineHeight: '1.5rem',
        letterSpacing: 3,
        bottom: theme.spacing(7),
        right: '30%',
        backgroundColor: '#00802b',
        padding: '10px 35px',
        fontWeight: 600,
        fontSize: '13.5px',
        zIndex: 1,
        // margin: 'auto',
        width: '45%',
        borderRadius: '25px 25px 25px 25px',
        // boxShadow: '-1px 2px 2px 2px #99999999'
    },

}));
function SimpleMenu(props) {
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [categories, setCategory] = useState('All');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleChange = (event) => {
        props.onSetCategory(event.target.value)
        setCategory(event.target.value)

    }

    return (
        <div>
            <span>
                <Button className={styles.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <FormatListBulletedIcon className={styles.extendedIcon} />
       &nbsp;&nbsp;Browse
         </Button></span>
            <div className="Wrapper">
                <div>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={styles.menu}
                    >
                        <div className="Categories">

                            <MenuItem onClick={handleClose} key={1}>

                                <label for="AllCategory" className="container" style={{ display: 'grid', gridTemplateColumns: '200px 220px' }}>All<span >({props.allproducts})</span>
                                    <input id="AllCategory" type="radio" key={1} value={"All"} checked={props.category === "All"} onChange={handleChange} />
                                    <span className="checkmark"></span>
                                </label>

                            </MenuItem>
                            {

                                props.categoryDataArray.map(category => (
                                    <MenuItem onClick={handleClose} key={category._id}>
                                        <label for={category.id} className="container" style={{ display: 'grid', gridTemplateColumns: '200px 200px' }}>{category.categoryName}
                                            <span>({category.productCount})</span>
                                            <input id={category.id} type="radio" key={category._id} value={category.categoryName} checked={props.category === category.categoryName} onChange={handleChange} />
                                            <span className="checkmark"></span>
                                        </label>

                                    </MenuItem>

                                ))
                            }


                        </div>


                    </Menu>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        category: state.category.category,
        categoryDataArray: state.category.categoryDataArray,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSetCategory: (category) => dispatch(Categoryaction.setcategory(category)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleMenu)