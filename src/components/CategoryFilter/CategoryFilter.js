import React from "react";
import "./CategoryFilter.css";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectLabel: {
    backgroundColor: "#fafafa",
  },
}));

function CategoryFilter() {
  const [{ categoryDataArray }, dispatch] = useStateValue();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("All");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="categoryFilter">
      <Typography variant="h6">Filter Category</Typography>
      <div className="categoryFilter__right">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
          >
            <MenuItem key={0} className={classes.selectLabel} value="All">
              All
            </MenuItem>
            {categoryDataArray.map((categoryname, i) => (
              <MenuItem
                key={i + 1}
                className={classes.selectLabel}
                value={categoryname}
              >
                {categoryname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default CategoryFilter;
