import { observer } from 'mobx-react-lite';
import hotelsStore from '../../store/hotelsStore/hotelsStore';
import './App.css';
import { useEffect } from 'react';
import { trace } from 'mobx';

const App = observer(() => {
  useEffect(() => {
    hotelsStore.fetchList();
  }, []);

  trace();

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
            hotelsStore.addFilter('maxPrice', '8000');
          }}
        >
          filter
        </button>
        <button
          onClick={() => {
            hotelsStore.removeFilter('maxPrice');
          }}
        >
          remove
        </button>
        <button
          onClick={() => {
            hotelsStore.clearFilters();
          }}
        >
          clear
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
