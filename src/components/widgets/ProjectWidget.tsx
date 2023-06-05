import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
// Theme
import Colors from '../../theme/Colors';
import Layout from '../../theme/Layout';
// Components
import { CommonImage } from '../image';
import { MediumText, RegularText, SemiBoldText } from '../texts';
// Icon
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  SettingIcon,
  StructureIcon,
  TransactionIcon,
} from '../../utils/SvgIcon';
// Constants
import { kScaledSize, kSpacing, kTextSizes } from '../../utils/Constants';
import { formatNumber } from '../../utils/Common';
// Type
import { ProjectField } from '../../models/Widget';
// Redux
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../../hooks/RTKHooks';
// Translate
import i18next from 'i18next';

type Props = {
  title: string;
  row: number;
  lists: ProjectField[];
  style?: ViewStyle;
};

type ItemProps = {
  item: ProjectField;
  index: number;
  navigation: any;
};

const ProjectItem: React.FC<ItemProps> = ({ item, index, navigation }) => {
  const { projectInfo, projectOwner } = item;
  const onPressItem = (): void => {
    navigation.navigate('ProjectStack', {
      screen: 'ProjectDetailScreen',
      param: { item },
    });
  };
  return (
    <TouchableOpacity
      onPress={onPressItem}
      activeOpacity={0.8}
      style={[
        styles.item,
        { marginLeft: index === 0 ? kSpacing.kSpacing15 : 0 },
      ]}>
      <View style={styles.info}>
        <View style={[Layout.rowBetween]}>
          <CommonImage
            source={projectOwner.avatar}
            wrapperStyle={styles.avatarWrapper}
            resize="cover"
          />
          <View style={[Layout.rowCenter]}>
            <MediumText
              style={[styles.text, { marginRight: kSpacing.kSpacing5 }]}>
              {i18next.t('Common.Detail')}
            </MediumText>
            <Ionicons
              name="arrow-forward-circle-outline"
              size={kScaledSize(22)}
              color={Colors.secondary}
            />
          </View>
        </View>
        <MediumText numberOfLines={1} style={[styles.text, styles.projectName]}>
          {projectInfo.title}
        </MediumText>
        <RegularText numberOfLines={2} style={[styles.text, styles.content]}>
          {projectInfo.content}
        </RegularText>
        <View style={[Layout.rowBetween, styles.participantWrapper]}>
          <View style={[Layout.rowCenter, styles.participant]}>
            <FontAwesome
              name="users"
              size={kScaledSize(15)}
              color={Colors.secondary}
            />
            <MediumText
              numberOfLines={1}
              style={[
                Layout.textSecondary,
                { fontSize: kTextSizes.mini, marginLeft: kSpacing.kSpacing5 },
              ]}>
              {i18next.t('Widget.Participant')}
            </MediumText>
          </View>
          <MediumText style={[Layout.textSecondary, { marginLeft: 10 }]}>
            {projectInfo.participant}
          </MediumText>
        </View>
        <View style={[Layout.rowBetween]}>
          <View style={[Layout.rowCenter, styles.participant]}>
            <AntDesign
              name="swap"
              size={kScaledSize(20)}
              color={Colors.secondary}
            />
            <MediumText
              numberOfLines={1}
              style={[
                Layout.textSecondary,
                { fontSize: kTextSizes.mini, marginLeft: kSpacing.kSpacing5 },
              ]}>
              {i18next.t('Widget.Total')}
            </MediumText>
          </View>
          <MediumText style={[Layout.textSecondary, { marginLeft: 10 }]}>
            {formatNumber(projectInfo.total)}
          </MediumText>
        </View>
      </View>
      <View style={[styles.statistic, Layout.row]}>
        <View style={[styles.statisticItem, Layout.rowHCenter]}>
          <SemiBoldText allowFontScaling={false} style={styles.statisticNum}>
            {projectInfo.transaction}
          </SemiBoldText>
          <View style={[styles.statisticIcon]}>
            <TransactionIcon color={Colors.navy} />
          </View>
        </View>
        <View
          style={[
            styles.statisticItem,
            Layout.rowHCenter,
            { justifyContent: 'flex-end' },
          ]}>
          <SemiBoldText allowFontScaling={false} style={styles.statisticNum}>
            {projectInfo.transactionStructure}
          </SemiBoldText>
          <View style={styles.statisticIcon}>
            <StructureIcon color={Colors.navy} />
          </View>
        </View>
        <View
          style={[
            styles.statisticItem,
            Layout.rowHCenter,
            { justifyContent: 'flex-end' },
          ]}>
          <SemiBoldText allowFontScaling={false} style={styles.statisticNum}>
            {projectInfo.policy}
          </SemiBoldText>
          <View style={styles.statisticIcon}>
            <MaterialIcons
              name="library-books"
              size={kScaledSize(22)}
              color={Colors.navy}
            />
          </View>
        </View>
        <View
          style={[
            styles.statisticItem,
            Layout.rowHCenter,
            { justifyContent: 'flex-end' },
          ]}>
          <SemiBoldText allowFontScaling={false} style={styles.statisticNum}>
            {projectInfo.wallet}
          </SemiBoldText>
          <View style={styles.statisticIcon}>
            <Fontisto
              name="wallet"
              size={kScaledSize(20)}
              color={Colors.navy}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProjectWidget: React.FC<Props> = ({ title, lists, style }) => {
  const { isLogin } = useAppSelector(state => state.auth);
  const navigation = useNavigation<any>();
  const onPress = (type: string): void => {
    if (type === 'Project') {
      navigation.navigate('ProjectStack');
    } else {
      navigation.navigate('HomeSettingScreen');
    }
  };
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.more, Layout.rowBetween]}>
        <SemiBoldText style={styles.title}>{title}</SemiBoldText>
        <View style={[Layout.row]}>
          <TouchableOpacity
            onPress={() => onPress('Project')}
            activeOpacity={0.6}
            style={[Layout.center]}>
            <MediumText style={styles.moreText}>
              {i18next.t('Common.More')}
            </MediumText>
          </TouchableOpacity>
          {isLogin && (
            <TouchableOpacity
              onPress={() => onPress('Setting')}
              style={styles.settingIcon}>
              <SettingIcon color={Colors.grey5} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={[styles.widgetList, Layout.shadow]}>
        <FlatList
          data={lists}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ProjectItem item={item} index={index} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};

export default ProjectWidget;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: kSpacing.kSpacing10,
  },
  widgetList: {
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingTop: kSpacing.kSpacing12,
    paddingBottom: kSpacing.kSpacing7,
  },
  more: {
    paddingHorizontal: kSpacing.kSpacing15,
    marginBottom: kSpacing.kSpacing10,
  },
  moreText: {
    fontSize: kTextSizes.mini,
    color: Colors.purple,
  },
  title: {
    fontSize: kTextSizes.medium,
  },
  settingIcon: {
    width: kScaledSize(20),
    height: kScaledSize(20),
    marginLeft: kSpacing.kSpacing10,
  },
  item: {
    borderRadius: 5,
    width: kScaledSize(253),
    marginRight: kSpacing.kSpacing10,
    backgroundColor: Colors.grey10,
    marginBottom: kSpacing.kSpacing5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  info: {
    padding: kSpacing.kSpacing13,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: Colors.primary,
  },
  avatarWrapper: {
    width: kScaledSize(32),
    height: kScaledSize(32),
    borderRadius: kScaledSize(16),
    borderWidth: 2,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: Colors.white,
    fontSize: kTextSizes.xmini,
  },
  projectName: {
    fontSize: kTextSizes.large,
    marginVertical: kSpacing.kSpacing8,
  },
  content: {
    marginBottom: kSpacing.kSpacing8,
  },
  participantWrapper: {
    marginBottom: kSpacing.kSpacing2,
  },
  participant: {
    flex: 1,
    justifyContent: 'flex-start',
    marginRight: 20,
  },
  statistic: {
    paddingVertical: kSpacing.kSpacing5,
    paddingHorizontal: kSpacing.kSpacing13,
  },
  statisticItem: {
    width: '25%',
  },
  statisticIcon: {
    height: kScaledSize(24),
    width: kScaledSize(24),
  },
  statisticNum: {
    color: Colors.navy,
    marginRight: kSpacing.kSpacing5,
  },
});
