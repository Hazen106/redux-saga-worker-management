import { all, takeLatest, call, put } from 'redux-saga/effects';
import{
    ADD_WORKER_REQUEST,
    ADD_WORKER_SUCCESS,
    ADD_WORKER_FAILURE,
    UPDATE_WORKER_REQUEST,
    UPDATE_WORKER_SUCCESS,
    UPDATE_WORKER_FAILURE,
    DELETE_WORKER_REQUEST,
    DELETE_WORKER_SUCCESS,
    DELETE_WORKER_FAILURE,
} from '../actions/WorkerActions';

//Giả lập API thêm nhân viên mới
const apiAddWorker = (worker) => {
    return new Promise((resolve, reject) => {
        // Sử dụng setTimeout để giả lập yêu cầu bất đồng bộ
        setTimeout(() => {
            // Tạo một đối tượng newWorker mới với id duy nhất
            const newWorker = { ...worker, id: Date.now() };
            //Được gọi thì chuyển pending sang fulfilled và truyền giá trị newWorker tới .then của Promise
            resolve(newWorker); 
        }, 1000); // Giả lập thời gian chờ 1 giây
    });
};

//Giả lập API update nhân viên //Trả về đối tượng nhân viên đã cập nhật sau khoảng thời gian chòw
const apiUpdateWorker = (worker) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(worker);
        }, 1000);
    });
};

//Giả lập API xóa nhân viên
const apiDeleteWorker = (workerid) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(workerid);
        }, 1000)
    });
};

//Hàm generator xử lý thêm nhân viên
function* addWorker(action) {
    try {
        // Gọi API thêm nhân viên và đợi kết quả
        const newWorker = yield call(apiAddWorker, action.payload);
        
        // Phát hành hành động thành công với dữ liệu nhân viên mới
        yield put({ type: ADD_WORKER_SUCCESS, payload: newWorker });
    } catch (error) {
        // Phát hành hành động thất bại với thông điệp lỗi
        yield put({ type: ADD_WORKER_FAILURE, error: error.message });
    }
}

//Hàm generator xử lý update nhân viên
function* updateWorker(action) {
    try {
        const updateWorker = yield call(apiUpdateWorker, action.payload);
        yield put({ type: UPDATE_WORKER_SUCCESS, payload: updateWorker});
    } catch (error) {
        yield put({ type: UPDATE_WORKER_FAILURE, error: error.message});
    }
}

//Hàm generator xử lý xóa nhân viên
function* deleteWorker(action) {
    try {
        yield call(apiDeleteWorker, action.payload);
        yield put({type: DELETE_WORKER_SUCCESS, payload: action.payload});
    } catch (error) {
        yield put({type: DELETE_WORKER_FAILURE, error: error.message});
    }
}

//Theo dõi các action thêm nhân viên
//Hàm generator để lắng nghe hành động ADD_WORKER_REQUEST
function* watchAddWorker() {
    //takeLatest lắng nghe hành động ADD_WORKER_REQUEST và kích hoạt hàm addWorker
    yield takeLatest(ADD_WORKER_REQUEST, addWorker);
}

//Theo dõi các action update nhân viên
function* watchUpdateWorker() {
    yield takeLatest(UPDATE_WORKER_REQUEST, updateWorker);
}

//Theo dõi các action xóa nhân viên
function* watchDeleteWorker() {
    yield takeLatest(DELETE_WORKER_REQUEST,deleteWorker);
}

// Kết hợp các hàm generator lại
export default function* rootSaga() {
    yield all([
        watchAddWorker(),
        watchUpdateWorker(),
        watchDeleteWorker(),
    ]);
}