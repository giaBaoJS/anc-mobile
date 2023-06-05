import { createSlice } from '@reduxjs/toolkit';
import { EmailList, PhoneList } from '../../models/Contact';

interface initialStateField {
  isLoading: boolean;
  phoneList: PhoneList[];
  emailList: EmailList[];
}

const initialState: initialStateField = {
  isLoading: false,
  phoneList: [
    {
      title: 'Công việc',
      phone: '01229992322',
    },
  ],
  emailList: [
    {
      title: 'Công việc',
      email: 'User@gmail.com',
    },
  ],
};

const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    onAddPhone: (state, action) => {
      state.phoneList.push(action.payload);
    },
    onAddEmail: (state, action) => {
      state.emailList.push(action.payload);
    },
    onDeletePhone: (state, action) => {
      console.log(action);
      state.phoneList.splice(action.payload, 1);
    },
    onDeleteEmail: (state, action) => {
      state.emailList.splice(action.payload, 1);
    },
  },
});

export const { onAddPhone, onAddEmail, onDeletePhone, onDeleteEmail } =
  ContactSlice.actions;

export default ContactSlice.reducer;
