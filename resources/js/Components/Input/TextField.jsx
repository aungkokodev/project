import { TextField as MuiTextField } from "@mui/material";

function TextField({ ...props }) {
    return (
        <MuiTextField
            sx={{
                "& label.Mui-focused": {
                    color: "green",
                },
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "green",
                    },
                },
                "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "green",
                },
            }}
            {...props}
        />
    );
}

export default TextField;
