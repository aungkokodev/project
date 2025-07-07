import { Select } from "@mui/material";

function FormSelect(props) {
    return (
        <Select
            {...props}
            MenuProps={{
                PaperProps: {
                    sx: {
                        maxHeight: 36 * 5 + 8,
                    },
                },
            }}
        />
    );
}

export default FormSelect;
