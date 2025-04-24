import { createSlice } from '@reduxjs/toolkit';

interface EmptyModal {
    open: boolean;
    data: any;
}

interface DeleteModal {
    name: 'category' | 'product' | 'order-product' | 'order' | 'production' | null;
    id: number | null;
    data: any;
}

interface ModalState {
    modifyCategory: EmptyModal;
    modifyProduct: EmptyModal;
    addOrderProduct: EmptyModal;
    modifyUser: EmptyModal;
    addProductionProduct: EmptyModal;
    modifyPermission: EmptyModal;
    completeProduction: EmptyModal;
    deleteModal: DeleteModal;
}

const emptyModal: EmptyModal = { open: false, data: {} };
const emptyDeleteModal: DeleteModal = { name: null, id: null, data: {} };

const initialState: ModalState = {
    modifyCategory: emptyModal,
    modifyProduct: emptyModal,
    addOrderProduct: emptyModal,
    completeProduction: emptyModal,
    modifyUser: emptyModal,
    modifyPermission: emptyModal,
    deleteModal: emptyDeleteModal,
    addProductionProduct: emptyModal,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // open modals
        openModifyCategoryModal: (state, { payload }) => {
            state.modifyCategory = { open: true, data: payload };
        },
        openModifyProductModal: (state, { payload }) => {
            state.modifyProduct = { open: true, data: payload };
        },
        openAddOrderProductModal: (state, { payload }) => {
            state.addOrderProduct = { open: true, data: payload };
        },
        openAddProductionProductModal: (state, { payload }) => {
            state.addProductionProduct = { open: true, data: payload };
        },
        openCompleteProductionModal: (state, { payload }) => {
            state.completeProduction = { open: true, data: payload };
        },
        openModifyUserModal: (state, { payload }) => {
            state.modifyUser = { open: true, data: payload };
        },
        openModifyPermissionModal: (state, { payload }) => {
            state.modifyPermission = { open: true, data: payload };
        },

        // close modals
        closeModifyCategoryModal: (state) => {
            state.modifyCategory = emptyModal;
        },
        closeModifyProductModal: (state) => {
            state.modifyProduct = emptyModal;
        },
        closeAddOrderProductModal: (state) => {
            state.addOrderProduct = emptyModal;
        },
        closeAddProductionProductModal: (state) => {
            state.addProductionProduct = emptyModal;
        },
        closeCompleteProductionModal: (state) => {
            state.completeProduction = emptyModal;
        },
        closeModifyUserModal: (state) => {
            state.modifyUser = emptyModal;
        },
        closeModifyPermissionModal: (state) => {
            state.modifyPermission = emptyModal;
        },
        // delete models
        openDeleteModal: (state, { payload }) => {
            state.deleteModal = payload;
        },
        closeDeleteModal: (state) => {
            state.deleteModal = emptyDeleteModal;
        },
    },
});

export const {
    openModifyCategoryModal,
    openModifyProductModal,
    openAddOrderProductModal,
    openModifyUserModal,
    openModifyPermissionModal,
    openAddProductionProductModal,
    openCompleteProductionModal,
    closeModifyCategoryModal,
    closeModifyProductModal,
    closeAddProductionProductModal,
    closeModifyPermissionModal,
    closeAddOrderProductModal,
    closeCompleteProductionModal,
    closeModifyUserModal,
    openDeleteModal,
    closeDeleteModal,
} = modalSlice.actions;

export default modalSlice.reducer;
