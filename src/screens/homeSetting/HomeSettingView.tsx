/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  LayoutRectangle,
  Image,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { DraggableGrid } from 'react-native-draggable-grid';
// Animated
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
// Components
import { Header } from '../../components/headers';
import { MediumText, RegularText, SemiBoldText } from '../../components/texts';
// Translate
import i18next from 'i18next';
// Constants
import Layout from '../../theme/Layout';
import Colors from '../../theme/Colors';
import {
  FONT_FAMILY_SEMIBOLD,
  kHeight,
  kScaledSize,
  kSpacing,
  kTextSizes,
  kWidth,
  HOME_DASHBOARD_ANC_UTILITIES_WIDGET,
  HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET,
  HOME_DASHBOARD_ANC_NEWS_WIDGET,
  HOME_DASHBOARD_ANC_ABOUT_ANC_WIDGET,
} from '../../utils/Constants';
// Type
import {
  CustomConfigField,
  HomeSettingField,
  listPersonalMenu,
  listPersonalMenuShow,
  NewsConfigField,
  OptionSortedField,
  PersonalMenuField,
  PersonalMenuFieldDrag,
  PrefsField,
} from '../../models/HomeSetting';
// Icon
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
// Redux
import { useAppSelector } from '../../hooks/RTKHooks';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import { hasNotch } from '../../utils/Common';
import {
  HandPointIcon,
  LogoIcon,
  StructureIcon,
  TransactionPropertiesIcon,
  TransactionRoleIcon,
} from '../../utils/SvgIcon';

import { PostDataCommon } from '../../store/slices/HomeSettingSlice';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const IconAnimated = Animated.createAnimatedComponent(MaterialIcons);
const ICON_SIZE40 = hasNotch() ? kScaledSize(32) : kScaledSize(37);
const MIN_NUM_OF_SHOW = 1;
const MAX_NUM_OF_SHOW = 10;

interface Props {
  data: HomeSettingField[];
  setData: React.Dispatch<React.SetStateAction<HomeSettingField[]>>;
  onChangePosition: (updatedList: HomeSettingField[]) => void;
  onToggleShow: (type: string, status: boolean) => void;
  customConfig: CustomConfigField;
  listOptionSorted: OptionSortedField[];
  onUpdateSetting: (data: PostDataCommon) => void;
  settingListDefault: HomeSettingField[];
}

interface ContainerNewsProps {
  newsSetting: HomeSettingField;
  onAdjustNumOfShow: (
    key: string,
    mode: string,
    prefs: PrefsField,
    numOfShow?: number,
  ) => void;
  onResetConfig: (key: string) => void;
}
interface ContainerProjectProps {
  publicProjectSetting: HomeSettingField;
  listOptionSorted: OptionSortedField[];
  onAdjustNumOfShow: (
    key: string,
    mode: string,
    prefs: PrefsField,
    numOfShow?: number,
  ) => void;
  onResetConfig: (key: string) => void;
}
interface ContainerPersonalMenusProps {
  lsMenuShow: PersonalMenuFieldDrag[];
  lsMenuHide: PersonalMenuField[];
}

const ContainerNews = ({
  newsSetting,
  onAdjustNumOfShow,
  onResetConfig,
}: ContainerNewsProps) => {
  let numOfShow = newsSetting.prefs.limit;
  return (
    <>
      {/* Line số tin hiển thị */}
      <View
        style={[
          styles.show,
          Layout.rowBetween,
          {
            borderTopWidth: 0,
            paddingVertical: kSpacing.kSpacing8,
          },
        ]}>
        <RegularText style={styles.showNumberText}>
          {i18next.t('HomeSettingScreen.NumberOfNews')}:
        </RegularText>
        <View style={[Layout.rowHCenter]}>
          <TouchableOpacity
            onPress={() => {
              onAdjustNumOfShow(
                HOME_DASHBOARD_ANC_NEWS_WIDGET,
                'add',
                newsSetting.prefs,
                numOfShow,
              );
            }}
            disabled={numOfShow === MAX_NUM_OF_SHOW}>
            <AntDesign
              name="pluscircle"
              size={kScaledSize(18)}
              color={
                numOfShow === MAX_NUM_OF_SHOW
                  ? Colors.light_grey
                  : Colors.primary
              }
            />
          </TouchableOpacity>
          <View style={styles.countWraper}>
            <MediumText style={[styles.showNumberText, styles.numberCount]}>
              {numOfShow}
            </MediumText>
          </View>
          <TouchableOpacity
            onPress={() => {
              onAdjustNumOfShow(
                HOME_DASHBOARD_ANC_NEWS_WIDGET,
                'minus',
                newsSetting.prefs,
                numOfShow,
              );
            }}
            disabled={numOfShow === MIN_NUM_OF_SHOW}>
            <AntDesign
              name="minuscircle"
              size={kScaledSize(18)}
              color={
                numOfShow === MIN_NUM_OF_SHOW
                  ? Colors.light_grey
                  : Colors.primary
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phục hồi mặc định */}
      <View style={Layout.rowHCenter}>
        <TouchableOpacity
          onPress={() => onResetConfig(HOME_DASHBOARD_ANC_NEWS_WIDGET)}>
          <MaterialCommunityIcons
            name="backup-restore"
            size={kScaledSize(26)}
            style={[
              styles.show,
              { color: Colors.accent6, marginRight: kSpacing.kSpacing5 },
            ]}
          />
        </TouchableOpacity>
        <MediumText
          style={{ color: Colors.grey6, fontSize: kTextSizes.middle }}>
          {i18next.t('HomeSettingScreen.RestoreDefault')}
        </MediumText>
      </View>
    </>
  );
};

const ContainerProject = ({
  publicProjectSetting,
  listOptionSorted,
  onAdjustNumOfShow,
  onResetConfig,
}: ContainerProjectProps) => {
  const [optionID, setOptionID] = useState<number>(1);
  const [itemOption, setItemOption] = useState<OptionSortedField>(
    listOptionSorted[0],
  );
  // const [numOfShow, setNumOfShow] = useState<number>(0);
  let numOfShow = publicProjectSetting.prefs.limit;
  useEffect(() => {
    if (publicProjectSetting.prefs.option_order_by_id !== undefined) {
      setOptionID(publicProjectSetting.prefs.option_order_by_id);
    }
  }, []);

  useEffect(() => {
    setItemOption(listOptionSorted.filter(x => x.id === optionID)[0]);
  }, [optionID]);

  const onSelectOption = (value: number) => {
    setOptionID(listOptionSorted.filter(x => x.id === value)[0].id);
  };

  return (
    <>
      {/* Line số tin hiển thị */}
      <View
        style={[
          styles.show,
          Layout.rowBetween,
          {
            borderTopWidth: 0,
            paddingVertical: kSpacing.kSpacing8,
          },
        ]}>
        <RegularText style={styles.showNumberText}>
          {i18next.t('HomeSettingScreen.NumberOfNews')}:
        </RegularText>
        <View style={[Layout.rowHCenter]}>
          <TouchableOpacity
            onPress={() => {
              // setNumOfShow(numOfShow + 1);
              onAdjustNumOfShow(
                HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET,
                'add',
                publicProjectSetting.prefs,
                numOfShow,
              );
            }}
            disabled={numOfShow === MAX_NUM_OF_SHOW}>
            <AntDesign
              name="pluscircle"
              size={kScaledSize(18)}
              color={
                numOfShow === MAX_NUM_OF_SHOW
                  ? Colors.light_grey
                  : Colors.primary
              }
            />
          </TouchableOpacity>
          <View style={styles.countWraper}>
            <MediumText style={[styles.showNumberText, styles.numberCount]}>
              {numOfShow}
            </MediumText>
          </View>
          <TouchableOpacity
            onPress={() => {
              onAdjustNumOfShow(
                HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET,
                'minus',
                publicProjectSetting.prefs,
                numOfShow,
              );
            }}
            disabled={MIN_NUM_OF_SHOW === numOfShow}>
            <AntDesign
              name="minuscircle"
              size={kScaledSize(18)}
              color={
                numOfShow === MIN_NUM_OF_SHOW
                  ? Colors.light_grey
                  : Colors.primary
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Line sorted */}

      <View
        style={[
          styles.show,
          Layout.rowBetween,
          {
            borderTopWidth: 0,
            paddingVertical: kSpacing.kSpacing8,
          },
        ]}>
        <RegularText style={styles.showNumberText}>
          {i18next.t('HomeSettingScreen.SortedBy')}:
        </RegularText>
        <View style={Layout.rowHCenter}>
          <Menu onSelect={onSelectOption}>
            <MenuTrigger
              // text={sorted.label}
              customStyles={{
                triggerWrapper: { flexDirection: 'row', alignItems: 'center' },
              }}>
              <SemiBoldText style={{ fontSize: kTextSizes.middle }}>
                {itemOption?.label}
              </SemiBoldText>
              <IconAnimated name="keyboard-arrow-down" size={kScaledSize(22)} />
            </MenuTrigger>

            <MenuOptions>
              <FlatList
                data={listOptionSorted}
                renderItem={({ item }) => (
                  <MenuOption
                    customStyles={{
                      optionWrapper: { padding: kSpacing.kSpacing10 },
                    }}
                    text={item.label}
                    value={item.id}
                  />
                )}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {/* Phục hồi mặc định */}
      <View style={Layout.rowHCenter}>
        <TouchableOpacity
          onPress={() =>
            onResetConfig(HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET)
          }>
          <MaterialCommunityIcons
            name="backup-restore"
            size={kScaledSize(26)}
            style={[
              styles.show,
              { color: Colors.accent6, marginRight: kSpacing.kSpacing5 },
            ]}
          />
        </TouchableOpacity>
        <MediumText
          style={{ color: Colors.grey6, fontSize: kTextSizes.middle }}>
          {i18next.t('HomeSettingScreen.RestoreDefault')}
        </MediumText>
      </View>
    </>
  );
};

const ContainerPersonalMenus = ({
  lsMenuHide,
  lsMenuShow,
}: ContainerPersonalMenusProps) => {
  const [lsShow, setLsShow] = useState<PersonalMenuFieldDrag[]>(lsMenuShow);
  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'News':
        return <Foundation name="megaphone" size={ICON_SIZE40} color={color} />;
      case 'Project':
        return <Entypo name="briefcase" size={ICON_SIZE40} color={color} />;
      case 'QRScan':
        return (
          <Ionicons name="qr-code-outline" size={ICON_SIZE40} color={color} />
        );
      case 'Helper':
        return (
          <Entypo name="help-with-circle" size={ICON_SIZE40} color={color} />
        );
      case 'TransactionSource':
        return <Entypo name="shop" size={ICON_SIZE40} color={color} />;
      case 'PolicyPattern':
        return <Ionicons name="library" size={ICON_SIZE40} color={color} />;
      case 'TransactionStructure':
        return (
          <View>
            <StructureIcon color={color} />
          </View>
        );
      case 'TransactionProperties':
        return (
          <View>
            <TransactionPropertiesIcon color={color} />
          </View>
        );
      case 'TransactionRole':
        return (
          <View>
            <TransactionRoleIcon color={color} />
          </View>
        );
      case 'Currency':
        return (
          <Fontisto name="money-symbol" size={ICON_SIZE40} color={color} />
        );
      case 'AboutANC':
        return <LogoIcon focused={false} />;
      default:
        return null;
    }
  };

  const changeList = (idx: number) => {
    let data = [...lsShow];
    data.splice(idx, 1);
    setLsShow(data);
  };

  const renderItem = (item: { name: string; key: string }) => {
    const itemFilter = lsShow.find(x => x.name === item.name);
    const idxFilter = lsShow.findIndex(x => x === itemFilter);
    return (
      <View>
        {itemFilter?.isSelected && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <View style={styles.containerIcon}>
              {getIcon(item.name, itemFilter.color)}
            </View>
            <SemiBoldText
              style={{
                fontWeight: '600',
                fontSize: kTextSizes.xxmini,
                marginBottom: kSpacing.kSpacing5,
              }}>
              {itemFilter.title}
            </SemiBoldText>
            <TouchableOpacity onPress={() => changeList(idxFilter)}>
              <AntDesign
                name="minuscircle"
                size={kScaledSize(11)}
                color={Colors.orange}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderItemHide = (item: PersonalMenuField, numColumns: number) => {
    return (
      <>
        {item.isSelected && (
          <TouchableOpacity>
            <View
              style={{
                width: kWidth / numColumns - kSpacing.kSpacing8,
                // backgroundColor: `rgba(${
                //   Math.random() * (255 - 0) + 0
                // }, ${Math.random()}, 52, 0.8)`,
                alignItems: 'center',
                marginBottom: kSpacing.kSpacing14,
              }}>
              <View style={styles.containerIcon}>
                {getIcon(item.name, item.color)}
              </View>
              <SemiBoldText
                style={{
                  fontWeight: '600',
                  fontSize: kTextSizes.xxmini,
                  marginBottom: kSpacing.kSpacing5,
                }}>
                {item.title}
              </SemiBoldText>

              <AntDesign
                name="pluscircle"
                size={kScaledSize(11)}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  // const [data, setData] = useState(lsMenuShow);

  return (
    <>
      <View
        style={[
          Layout.rowHCenter,
          styles.show,
          { marginTop: kSpacing.kSpacing10, height: 100 },
        ]}>
        <View
          style={{
            borderRightWidth: 1,
            borderColor: Colors.grey6,
            borderRightColor: Colors.grey6,
            width: ICON_SIZE40,
            height: ICON_SIZE40,
            justifyContent: 'center',
          }}>
          <LogoIcon focused={false} />
        </View>
        <View style={{ flexGrow: 1 }}>
          <DraggableGrid
            data={lsShow}
            renderItem={renderItem}
            numColumns={4}
            onDragRelease={data1 => {
              setLsShow(data1);
            }}
          />
        </View>
      </View>

      {/* Menu không hiển thị */}
      <View
        style={[
          styles.show,
          {
            borderTopWidth: 0,
            paddingVertical: kSpacing.kSpacing8,
          },
        ]}>
        <View
          style={[Layout.rowHCenter, { marginBottom: kSpacing.kSpacing10 }]}>
          <Icon
            name="eye-with-line"
            size={kScaledSize(18)}
            color={Colors.green1}
            style={{ marginRight: kSpacing.kSpacing10 }}
          />
          <RegularText style={{ fontSize: kTextSizes.small }}>
            {i18next.t('HomeSettingScreen.MenuNotShow')}
          </RegularText>
        </View>

        <FlatList
          key={Math.random()}
          // listKey={Math.random().toString()}
          data={lsMenuHide}
          renderItem={({ item }) => renderItemHide(item, 4)}
          numColumns={4}
        />
      </View>

      {/* Phục hồi mặc định */}
      <View style={Layout.rowBetween}>
        <View style={Layout.rowHCenter}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="backup-restore"
              size={kScaledSize(26)}
              style={[
                styles.show,
                {
                  color: Colors.accent6,
                  marginRight: kSpacing.kSpacing5,
                  borderTopWidth: 0,
                },
              ]}
            />
          </TouchableOpacity>
          <MediumText
            style={{ color: Colors.grey6, fontSize: kTextSizes.middle }}>
            {i18next.t('HomeSettingScreen.RestoreDefault')}
          </MediumText>
        </View>

        <View style={Layout.rowHCenter}>
          <TouchableOpacity
            style={{
              width: kScaledSize(24),
              height: kScaledSize(24),
              marginRight: kSpacing.kSpacing5,
            }}>
            <HandPointIcon color={Colors.green2} />
          </TouchableOpacity>
          <RegularText
            style={{
              color: Colors.green2,
              textAlign: 'right',
              fontSize: kTextSizes.mini,
            }}>
            {i18next.t('HomeSettingScreen.HoldToMove')}
          </RegularText>
        </View>
      </View>
    </>
  );
};

const RenderSettingBottomTab = () => {
  const iconRotate = useSharedValue<any>('0deg');
  const contentHeight = useSharedValue<number>(0);
  const contentOpacity = useSharedValue<number>(0);
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  // const [settingGroup, setSettingGroup] = useState<HomeSettingField>(item);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: iconRotate.value }],
    };
  });

  const contentAnimatedStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        contentHeight.value,
        [0, 1],
        [0, dynamicHeight],
        Extrapolate.CLAMP,
      ),
      opacity: contentOpacity.value,
    };
  });
  const onToggleFocus = (): void => {
    if (expanded) {
      iconRotate.value = Platform.OS === 'ios' ? withTiming('0deg') : '0deg';
      contentHeight.value = withTiming(0);
      setTimeout(() => {
        contentOpacity.value = withTiming(0);
      }, 100);
    } else {
      iconRotate.value = Platform.OS === 'ios' ? withTiming('90deg') : '90deg';
      contentHeight.value = withTiming(1);
      setTimeout(() => {
        contentOpacity.value = withTiming(1);
      }, 100);
    }
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.rowItem, Layout.shadow]}>
      <TouchableWithoutFeedback onPress={onToggleFocus}>
        <View style={[Layout.rowBetween]}>
          <View style={[Layout.rowHCenter]}>
            <MaterialIcons
              name="drag-indicator"
              size={kScaledSize(18)}
              color={Colors.white}
            />
            <SemiBoldText style={styles.title}>Setting Bottom</SemiBoldText>
          </View>
          <IconAnimated
            name="keyboard-arrow-right"
            size={kScaledSize(22)}
            style={[iconAnimatedStyle]}
          />
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[{ minHeight: 100 }, contentAnimatedStyles]}>
        {expanded && (
          <View
            onLayout={event => {
              const { x, y, width, height } = event.nativeEvent.layout;
              setDynamicHeight(height);
            }}>
            <ContainerPersonalMenus
              lsMenuHide={listPersonalMenu}
              lsMenuShow={listPersonalMenuShow}
            />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const HomeSettingView = ({
  data,
  setData,
  onChangePosition,
  onToggleShow,
  customConfig,
  listOptionSorted,
  onUpdateSetting,
  settingListDefault,
}: Props) => {
  const { utilityWidget, projectWidget, newsWidget, resourceWidget } =
    useAppSelector(state => state.home);
  // Render Item
  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<HomeSettingField>) => {
      const iconRotate = useSharedValue<any>('0deg');
      const contentHeight = useSharedValue<number>(0);
      const contentOpacity = useSharedValue<number>(0);
      const [dynamicHeight, setDynamicHeight] = useState(0);
      const [expanded, setExpanded] = useState<boolean>(false);
      const [settingGroup, setSettingGroup] = useState<HomeSettingField>(item);

      const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ rotate: iconRotate.value }],
        };
      });

      const onPressShow = (key: string): void => {
        setSettingGroup({ ...settingGroup, is_show: !settingGroup.is_show });
        onUpdateSetting({ key: key, is_show: !settingGroup.is_show });
      };

      const onAdjustNumOfShow = (
        key: string,
        mode: string,
        prefs: PrefsField,
        numOfShow?: number,
      ) => {
        if (prefs.limit !== undefined && numOfShow !== undefined) {
          if (mode === 'add') {
            prefs = { ...prefs, limit: numOfShow + 1 };
          } else {
            prefs = { ...prefs, limit: numOfShow - 1 };
          }
          setSettingGroup({ ...settingGroup, prefs: prefs });
          onUpdateSetting({ key: key, prefs: prefs });
        }
      };

      const onResetConfig = (key: string): void => {
        let filter = settingListDefault.filter(x => x.key === key)[0];
        setSettingGroup({
          ...settingGroup,
          is_show: filter.is_show,
          prefs: filter.prefs,
        });
        onUpdateSetting({
          key: key,
          prefs: filter.prefs,
          is_show: filter.is_show,
        });
      };

      const contentAnimatedStyles = useAnimatedStyle(() => {
        return {
          height: interpolate(
            contentHeight.value,
            [0, 1],
            [0, dynamicHeight],
            Extrapolate.CLAMP,
          ),
          opacity: contentOpacity.value,
        };
      });
      const onToggleFocus = (): void => {
        if (expanded) {
          iconRotate.value =
            Platform.OS === 'ios' ? withTiming('0deg') : '0deg';
          contentHeight.value = withTiming(0);
          setTimeout(() => {
            contentOpacity.value = withTiming(0);
          }, 100);
        } else {
          iconRotate.value =
            Platform.OS === 'ios' ? withTiming('90deg') : '90deg';
          contentHeight.value = withTiming(1);
          setTimeout(() => {
            contentOpacity.value = withTiming(1);
          }, 100);
        }
        setExpanded(!expanded);
      };

      const { key } = settingGroup;
      if (key === HOME_DASHBOARD_ANC_ABOUT_ANC_WIDGET) {
        return null;
      }
      return (
        <ScaleDecorator>
          <TouchableOpacity
            activeOpacity={0.9}
            onLongPress={drag}
            disabled={isActive}
            style={[styles.rowItem, Layout.shadow]}>
            <TouchableWithoutFeedback onPress={onToggleFocus}>
              <View style={[Layout.rowBetween]}>
                <View style={[Layout.rowHCenter]}>
                  <MaterialIcons
                    name="drag-indicator"
                    size={kScaledSize(18)}
                    color={Colors.purple2}
                  />
                  <SemiBoldText style={styles.title}>
                    {i18next.t(`HomeSettingScreen.${settingGroup.slug}`)}
                  </SemiBoldText>
                </View>
                <IconAnimated
                  name="keyboard-arrow-right"
                  size={kScaledSize(22)}
                  style={[iconAnimatedStyle]}
                />
              </View>
            </TouchableWithoutFeedback>
            <Animated.View style={[{ minHeight: 100 }, contentAnimatedStyles]}>
              {expanded && (
                <View
                  onLayout={event => {
                    const { x, y, width, height } = event.nativeEvent.layout;
                    setDynamicHeight(height);
                  }}>
                  {settingGroup.key !== 'menu' && (
                    <View
                      style={[
                        styles.show,
                        Layout.rowHCenter,
                        { marginTop: kSpacing.kSpacing13 },
                      ]}>
                      <TouchableOpacity
                        onPress={() => onPressShow(settingGroup.key)}>
                        <Icon
                          name={settingGroup.is_show ? 'eye' : 'eye-with-line'}
                          size={kScaledSize(18)}
                          color={Colors.green1}
                        />
                      </TouchableOpacity>
                      <RegularText style={styles.showText}>
                        {settingGroup.is_show
                          ? i18next.t('HomeSettingScreen.Show')
                          : i18next.t('HomeSettingScreen.Hidden')}
                      </RegularText>
                    </View>
                  )}
                  {settingGroup.key === HOME_DASHBOARD_ANC_NEWS_WIDGET && (
                    <ContainerNews
                      newsSetting={settingGroup}
                      onAdjustNumOfShow={onAdjustNumOfShow}
                      onResetConfig={onResetConfig}
                    />
                  )}
                  {settingGroup.key ===
                    HOME_DASHBOARD_ANC_PUBLIC_PROJECT_WIDGET && (
                    <ContainerProject
                      publicProjectSetting={settingGroup}
                      listOptionSorted={listOptionSorted}
                      onAdjustNumOfShow={onAdjustNumOfShow}
                      onResetConfig={onResetConfig}
                    />
                    // <ContainerPersonalMenus
                    //   lsMenuHide={listPersonalMenu}
                    //   lsMenuShow={listPersonalMenuShow}
                    // />
                  )}
                  {settingGroup.key === 'menu' && (
                    <ContainerPersonalMenus
                      lsMenuHide={customConfig.personalMenuConfig.lsMenuHide}
                      lsMenuShow={customConfig.personalMenuConfig.lsMenuShow}
                    />
                  )}
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </ScaleDecorator>
      );
    },
    [],
  );
  return (
    <View style={[Layout.container]}>
      <Header name={i18next.t('HomeSettingScreen.Title')} />
      <View style={Layout.fill}>
        <DraggableFlatList
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          onDragEnd={({ data: item }) => {
            setData(item);
            onChangePosition(item);
          }}
          keyExtractor={item => item.name}
          renderItem={renderItem}
        />
        <View style={{ height: kScaledSize(55) }}>
          <RenderSettingBottomTab />
        </View>
      </View>
    </View>
  );
};

export default HomeSettingView;

const styles = StyleSheet.create({
  container: {
    padding: kSpacing.kSpacing16,
  },
  rowItem: {
    marginTop: kSpacing.kSpacing10,
    paddingVertical: kSpacing.kSpacing10,
    paddingHorizontal: kSpacing.kSpacing13,
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexGrow: 1,
  },
  title: {
    fontSize: kTextSizes.medium,
    marginLeft: kSpacing.kSpacing5,
  },
  show: {
    paddingVertical: kSpacing.kSpacing12,
    borderBottomWidth: 0.5,
    borderTopWidth: 1,
    borderBottomColor: Colors.light_grey,
    borderTopColor: Colors.border,
  },
  showText: {
    fontSize: kTextSizes.small,
    marginLeft: kSpacing.kSpacing10,
  },

  showNumberText: {
    fontSize: kTextSizes.middle,
  },
  countWraper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey6,
    marginHorizontal: kSpacing.kSpacing10,
  },
  numberCount: {
    paddingVertical: kSpacing.kSpacing6,
    paddingHorizontal: kSpacing.kSpacing20,
  },
  rectangle: {
    width: 200,
    height: 200,
  },
  containerIcon: {
    marginBottom: kSpacing.kSpacing5,
    width: ICON_SIZE40,
    height: ICON_SIZE40,
  },

  userIcon: {
    resizeMode: 'contain',
    width: ICON_SIZE40,
    height: ICON_SIZE40,
  },
});
