
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {useState} from "react";
import {Box} from "@mui/material";
import {useDispatch,useSelector} from "react-redux";
import {getMyBussinessFunApi} from "store/business/services";

function BusinessDropDown(){
    const dispatch = useDispatch();
    const { businessAll } = useSelector((state) => state.business);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedBusiness(selectedValue);
        console.log("selectedValue83", selectedValue);
    
        const businessIdString = String(selectedValue);
        localStorage.setItem(
          "selectedBusinessId",
          JSON.stringify(businessIdString)
        );
    
        dispatch(
          getMyBussinessFunApi({
            data: {
              businessId: selectedValue,
            },
            onSuccess: () => {},
          })
        );
      };




    return  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "0px",
    }}
  >
    <Box>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel
          id="demo-select-small"
          sx={{ fontSize: "12px",marginLeft:'-3px'}}
        >
          Business
        </InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={selectedBusiness}
          label="Select"
          onChange={handleDropdownChange}
          sx={{
            fontSize: "14px",
            variant: "outlined",
            width: "200px",
            padding: "0",
          }}
          className="select"
        >
          {businessAll?.data?.map((business) => (
            <MenuItem key={business.id} value={business.id}>
              {business.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  </Box>
    
}

export default BusinessDropDown