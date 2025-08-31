import { View, Text, ScrollView } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { styles } from './styles';
import { MultiView } from '../../Components/MultiView';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import {
  aboutYellow,
  changePassYellow,
  helpYellow,
  notificationYellow,
  privacyYellow,
  profileYellow,
  supportYellow,
  termYellow,
} from '../../Assets';
import NavigationService from '../../Services/NavigationService';

const SettingScreen = () => {
  const Account = {
    title: 'Account',
    arryView: [
      {
        title: `Profile`,
        leftIcon: profileYellow,
        subView: 'View and edit your profile',
        onPress: () => NavigationService.navigate('EditProfileScreen'),
      },
      {
        title: 'Password',
        leftIcon: changePassYellow,
        subView: 'Change your password',
        onPress: () => NavigationService.navigate('ChangePasswordScreen'),
      },
    ],
  };
  const Preferences = {
    title: 'Preferences',
    arryView: [
      {
        title: `Notifications`,
        leftIcon: notificationYellow,
        subView: 'Manage your notification settings',
      },
    ],
  };
  const Support = {
    title: 'Support',
    arryView: [
      {
        title: `Help & FAQ`,
        leftIcon: helpYellow,
        subView: 'Find answers to common questions',
      },
      {
        title: 'Contact Support',
        leftIcon: supportYellow,
        subView: 'Contact our support team directly',
      },
      {
        title: 'Terms of Service',
        leftIcon: termYellow,
        subView: 'View our terms of service',
      },
      {
        title: 'Privacy Policy',
        leftIcon: privacyYellow,
        subView: 'Read our privacy policy',
      },
      {
        title: 'About',
        leftIcon: aboutYellow,
        subView: 'Learn more about the app',
      },
    ],
  };
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Setting'} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp('5'),
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.upperWhiteView}>
          <TextComponent text={Account.title} styles={styles.headingText} />
          <MultiView
            data={Account.arryView}
            viewStyle={styles.viewStyle}
            touchBtnViewStyles={styles.touchBtnViewStyles}
            dividerStyles={styles.dividerStyles}
            leftStyles={styles.leftIconStyle}
            itemViewStyle={styles.itemViewStyle}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent text={Preferences.title} styles={styles.headingText} />
          <MultiView
            data={Preferences.arryView}
            viewStyle={styles.viewStyle}
            touchBtnViewStyles={styles.touchBtnViewStyles}
            dividerStyles={styles.dividerStyles}
            leftStyles={styles.leftIconStyle}
            itemViewStyle={styles.itemViewStyle}
          />
        </View>
        <View style={styles.upperWhiteView}>
          <TextComponent text={Support.title} styles={styles.headingText} />
          <MultiView
            data={Support.arryView}
            viewStyle={styles.viewStyle}
            touchBtnViewStyles={styles.touchBtnViewStyles}
            dividerStyles={styles.dividerStyles}
            leftStyles={styles.leftIconStyle}
            itemViewStyle={styles.itemViewStyle}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(SettingScreen);
