import {
    FormControl,
    FormHelperText,
    Select as MuiSelect,
} from "@mui/material";

function Select({ ...props }) {
    return (
        <FormControl error={!!props.error} className={props.className}>
            <MuiSelect
                {...props}
                sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "green",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "green",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "green",
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            maxHeight: 36 * 5 + 8,
                        },
                    },
                }}
            />
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}

export default Select;
