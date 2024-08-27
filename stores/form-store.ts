import { customField } from "@/types";
import { createStore } from "zustand/vanilla";

export type FormState = {
    forms: any[];
    selectedForm: any;
};

export type FormActions = {
    createForm: (id: string, title: string) => void;
    editForm: (id: string, updates: { [key: string]: any }) => void;
    deleteForm: (id: string) => void;
    selectForm: (id: string) => void;
};

export type FormStore = FormState & FormActions;

export const defaultInitState: FormState = {
    forms: [],
    selectedForm: null,
};

export const createFormStore = (initState: FormState = defaultInitState) => {
    return createStore<FormStore>()((set) => ({
        ...initState,
        createForm: (id: string, title: string) =>
            set((state) => {
                const newForm = { id, title };
                return {
                    forms: [...state.forms, newForm],
                    selectedForm: newForm,
                };
            }),
        editForm: (id: string, updates: { [key: string]: any }) =>
            set((state) => {
                const updatedForms = state.forms.map((form) =>
                    form.id === id ? { ...form, ...updates } : form
                );
                const updatedSelectedForm =
                    state.selectedForm && state.selectedForm.id === id
                        ? { ...state.selectedForm, ...updates }
                        : state.selectedForm;
                return {
                    forms: updatedForms,
                    selectedForm: updatedSelectedForm,
                };
            }),
        deleteForm: (id: string) =>
            set((state) => ({
                forms: state.forms.filter((form) => form.id !== id),
            })),
        selectForm: (id: string) =>
            set((state) => ({
                selectedForm: state.forms.find((form) => form.id === id) || null,
            })),
    }));
};