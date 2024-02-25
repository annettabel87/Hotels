import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore/authStore';
import { Navigate } from 'react-router-dom';
import { ROUTE } from '../../constants/constants';

export const ProfilePage = observer(() => {
  return (
    <div>{authStore.isAuth ? <div> страница</div> : <Navigate to={ROUTE.LOGIN} />}</div>
  );
});
