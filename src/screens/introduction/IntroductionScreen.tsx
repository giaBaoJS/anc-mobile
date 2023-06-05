import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/RTKHooks';
import { authGetQRcode, authUserReferred } from '../../store/slices/AuthSlice';
import IntroductionView from './IntroductionView';

const IntroductionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { qrCode, listReferred, userRefer } = useAppSelector(
    state => state.auth,
  );
  const [avatar, setAvatar] = useState<any>(userRefer?.avatar || null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fecthUserReferred = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      await dispatch(authUserReferred()).unwrap();
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fecthUserReferred();
  }, []);

  return (
    <IntroductionView
      isLoading={isLoading}
      isError={isError}
      avatar={avatar}
      userRefer={userRefer}
      qrCode={qrCode}
      listReferred={listReferred}
      fecthUserReferred={fecthUserReferred}
    />
  );
};

export default IntroductionScreen;
