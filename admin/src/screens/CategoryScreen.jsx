import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { listCategoryApi, updateCategoryApi, deleteCategoryApi, createCategoryApi } from '../common/apiHelper';

export default function CategoryScreen() {
    const [open, setOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [categoryDetails, setCategoryDetails] = React.useState({ name: '', alias: '' });
    const [Category, setCategory] = useState([]);

    useEffect(() => { fetchCategories(); }, []);

    const fetchCategories = async () => {
        try {
            const res = await listCategoryApi();
            setCategory(res.data.data);
        } catch (err) { console.error(err); }
    };

    const handleSubmit = async () => {
        try {
            if (categoryDetails._id) {
                await updateCategoryApi({ id: categoryDetails._id, name: categoryDetails.name, alias: categoryDetails.alias });
            } else {
                await createCategoryApi(categoryDetails);
            }
            setCategoryDetails({ name: '', alias: '' });
            setOpen(false);
            fetchCategories();
        } catch (err) { console.error(err); }
    };

    const handleDelete = async () => {
        try {
            await deleteCategoryApi(deleteId);
            setConfirmOpen(false);
            setDeleteId(null);
            fetchCategories();
        } catch (err) { console.error(err); }
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'name', headerName: 'Category Name', width: 200 },
        { field: 'alias', headerName: 'Category Alias', width: 250 },
        {
            field: 'action', headerName: 'Action', width: 160, renderCell: (cell) => (
                <div className="d-flex gap-2 align-items-center h-100">
                    <button className="btn btn_edit btn-sm" onClick={() => { setCategoryDetails(cell.row); setOpen(true); }}><EditIcon fontSize="small" /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => { setDeleteId(cell.row._id); setConfirmOpen(true); }}><DeleteIcon fontSize="small" /></button>
                </div>
            )
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <div className='CategoryScreen'>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <div className="h3 text_main">Category</div>
                    <div className="text-muted tagline">Manage your product categories</div>
                </div>
                <div className="btn btn_main" onClick={handleClickOpen}>Add Category</div>
            </div>
            <hr />
            <Paper sx={{ height: 450, width: '100%' }}>
                <DataGrid
                    rows={[...Category]}
                    columns={[...columns]}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    getRowId={(row) => row._id}
                    sx={{ border: 0 }}
                    slots={{
                        noRowsOverlay: () => (
                            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                                <div className="text-muted">No categories found</div>
                            </div>
                        )
                    }}
                />
            </Paper>
            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{categoryDetails?._id ? 'Update Category' : 'Add Category'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={categoryDetails.name}
                            onChange={(e) => setCategoryDetails({ ...categoryDetails, name: e.target.value })}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="alias"
                            label="Category Alias"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={categoryDetails.alias}
                            onChange={(e) => setCategoryDetails({ ...categoryDetails, alias: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleClose} className='btn btn_outline'>Cancel</button>
                        <button className='btn btn_main' onClick={handleSubmit}>
                            {categoryDetails?._id ? 'Update' : 'Publish'}
                        </button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>Are you sure you want to delete this category?</DialogContent>
                <DialogActions>
                    <button className='btn btn_outline' onClick={() => setConfirmOpen(false)}>Cancel</button>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
