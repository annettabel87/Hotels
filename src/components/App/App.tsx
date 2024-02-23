import { observer } from 'mobx-react-lite';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import './App.css';
import { useEffect } from 'react';

const App = observer(() => {
  useEffect(() => {
    hotelsStore.fetchList();
  }, []);

  return (
    <>
      <div>
        {hotelsStore.loading ? (
          <p>Loading...</p>
        ) : (
          hotelsStore.hotels.map((item) => <p key={item.id}>{item.title}</p>)
        )}
        <button
          onClick={() => {
            hotelsStore.addFilter('maxPrice', '3000');
            hotelsStore.addFilter('city', 'Минск');
          }}
        >
          filter
        </button>
      </div>
      <p>{hotelsStore.error}</p>
      <p>{hotelsStore.searchPanelData.cities}</p>
      <p>{hotelsStore.searchPanelData.minPrice}</p>
      <p>{hotelsStore.searchPanelData.maxPrice}</p>
    </>
  );
});

export default App;
