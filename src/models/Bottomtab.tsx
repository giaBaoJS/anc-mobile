enum ToggleTab {
  Home = 0,
  User = 1,
}

export interface TabItemField {
  name: string;
  tabBarLabel: string;
}

export interface BottomTabInitialState {
  homeTabItemList: TabItemField[];
  userTabItemList: TabItemField[];
}

export interface BottomTabToggleField {
  toggleTab: ToggleTab;
}
