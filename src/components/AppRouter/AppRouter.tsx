import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ROUTE } from '../../constants/constants';
import { HotelCardPage } from '../../pages/HotelCardPage/HotelCardPage';
import { HotelsPage } from '../../pages/HotelsPage/HotelsPage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import authStore from '../../store/authStore/authStore';
import LayoutComponent from '../Layout/Layout';

export const AppRouter = observer(() => {
  authStore.checkLogin();

  return (
    <>
      <Routes>
        <Route path={ROUTE.MAIN} element={<LayoutComponent />}>
          <Route index element={<MainPage />} />
          <Route path={ROUTE.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE.HOTELS} element={<HotelsPage />} />
          <Route path={ROUTE.HOTEL_CARD} element={<HotelCardPage />} />
          <Route path={ROUTE.ALL} element={<NotFoundPage />} />
          <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
});
