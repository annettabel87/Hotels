import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore/authStore';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import usersStore from '../../store/usersStore/usersStore';

export const MainPage = observer(() => {
  return (
    <div>
      {' '}
      <div>
        {usersStore.isLoading ? <p>Loading...</p> : <p>{authStore.profile?.userName}</p>}
        <button
          onClick={() => {
            usersStore.addUser({
              userName: 'Anna',
              email: 'anna@mail.ru',
              password: '12345',
              prefix: '7',
              phone: '+79129321359',
            });
          }}
        >
          register
        </button>
        {usersStore.error && <p>{usersStore.error}</p>}
        <button
          onClick={() => {
            authStore.login('anna@mail.ru', '12345');
          }}
        >
          login
        </button>
        {authStore.error && <p>{authStore.error}</p>}
        <button
          onClick={() => {
            authStore.logout();
          }}
        >
          logout
        </button>
      </div>
      <p>{hotelsStore.error}</p>
      <p>{hotelsStore.searchPanelData.cities}</p>
      <p>{hotelsStore.searchPanelData.minPrice}</p>
      <p>{hotelsStore.searchPanelData.maxPrice}</p>
    </div>
  );
});
