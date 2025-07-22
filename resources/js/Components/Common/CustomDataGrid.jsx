import { DataGrid } from "@mui/x-data-grid";
import EmptyDataGrid from "../EmptyDataGrid";

function CustomDataGrid({ rows, columns, ...props }) {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            showToolbar
            disableColumnMenu
            disableRowSelectionOnClick
            getRowHeight={() => 64}
            sortingOrder={["asc", "desc"]}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            slots={{ noRowsOverlay: EmptyDataGrid }}
            className="text-inherit rounded-xl"
            {...props}
        />
    );
}

export default CustomDataGrid;
