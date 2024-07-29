import {
    ADD_WORKER_SUCCESS,
    UPDATE_WORKER_SUCCESS,
    DELETE_WORKER_SUCCESS,
} from '../actions/WorkerActions';

//Trạng thái ban đầu danh sách nhân viên
const initialState = {
    workers: [
        {id: 1, workercode: 111111, workername: 'Đỗ Văn Quý',age: 22, ban: 'Công nghệ thông tin',} 
    ],
};

//Reducer xử lý các action liên quan đến nhân viên
//Cú pháp ES6 gán giá trị mặc định cho state
const workersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKER_SUCCESS:
            //Thêm nhân viên mới vào danh sách
            return {
                ...state,
                workers: [...state.workers, action.payload],
            };
        case UPDATE_WORKER_SUCCESS:
            //Cập nhật thông tin nhân viên
            return {
                //Sao chép thuộc tính hiện tại, map để tạo mảng mới dựa trên workers, kiểm tra nhân viên trong mảng workers nếu id trùng với id nhân viên trong payload (nv cần cập nhật) thì trả về action.payload ngược lại thì không thay đổi
                ...state,
                workers: state.workers.map((worker) =>
                    worker.id === action.payload.id ? action.payload : worker
                ),
            };
        case DELETE_WORKER_SUCCESS:
            //Xóa nhân viên khỏi danh sách
            return {
                //Sao chép các thuộc tính hiện tại, filter tạo mảng mới dựa trên workers, giữ lại các nv không trùng với id trong payload
                ...state,
                workers: state.workers.filter(
                    (worker) => worker.id !== action.payload
                ),
            };
        default:
            return state;
    }   

};


export default workersReducer;