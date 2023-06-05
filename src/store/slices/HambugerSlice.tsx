import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { WritableDraft } from 'immer/dist/internal';
import {
  FeatureField,
  GroupFeatureField,
  PersonalFeatures,
  SystemANCFeatures,
} from '../../models/Hambuger';

const initialState = {
  isLoading: false,
  isError: false,
  personalFeatures: PersonalFeatures,
  systemANCFeatures: SystemANCFeatures,
};

const HambugerSlice = createSlice({
  name: 'hambuger',
  initialState,
  reducers: {
    onFilter: (state, action) => {
      if (action.payload === '') {
        state.personalFeatures = PersonalFeatures;
        state.systemANCFeatures = SystemANCFeatures;
      } else {
        let resPers: GroupFeatureField = {
          isExpand: false,
          listFeatures: [],
          numColumns: 4,
        };
        let resSys: GroupFeatureField = {
          isExpand: false,
          listFeatures: [],
          numColumns: 4,
        };

        // Filter for tab Personal
        PersonalFeatures.forEach(item => {
          resPers.listFeatures = [
            ...resPers.listFeatures,
            ...item.listFeatures.filter(it =>
              i18next
                .t(`HambugerScreen.${it.name}`)
                .toLowerCase()
                .replace('\n', ' ')
                .includes(action.payload),
            ),
          ];
        });
        // Filter for tab SysANC
        SystemANCFeatures.forEach(item => {
          resSys.listFeatures = [
            ...resSys.listFeatures,
            ...item.listFeatures.filter(it =>
              i18next
                .t(`HambugerScreen.${it.name}`)
                .toLowerCase()
                .replace('\n', ' ')
                .includes(action.payload),
            ),
          ];
        });
        state.personalFeatures = [resPers];
        state.systemANCFeatures = [resSys];
      }
    },
  },
});

export const { onFilter } = HambugerSlice.actions;

export default HambugerSlice.reducer;
