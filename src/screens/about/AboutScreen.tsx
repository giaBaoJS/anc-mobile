import React from 'react';
import AboutView from './AboutView';
import { useAppSelector } from '../../hooks/RTKHooks';

interface Props {}

const AboutScreen = ({}: Props) => {
  const { aboutWidget } = useAppSelector(state => state.home);
  return <AboutView item={aboutWidget} />;
};

export default AboutScreen;
