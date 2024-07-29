import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import WorkerList from './components/WorkerList';
import './styles.css';

//Quản lý trạng thái của toàn bộ ứng dụng cung cấp store qua 'Provider'
const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Quản Lý Nhân Viên</h1>
        <WorkerList />
      </div>
    </Provider>
  );
};

export default App;
