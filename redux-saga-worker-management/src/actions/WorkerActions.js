//Định nghĩa các loại action
export const ADD_WORKER_REQUEST = 'ADD_WORKER_REQUEST';
export const ADD_WORKER_SUCCESS = 'ADD_WORKER_SUCCESS';
export const ADD_WORKER_FAILURE = 'ADD_WORKER_FAILURE';

export const UPDATE_WORKER_REQUEST = 'UPDATE_WORKER_REQUEST';
export const UPDATE_WORKER_SUCCESS = 'UPDATE_WORKER_SUCCESS';
export const UPDATE_WORKER_FAILURE = 'UPDATE_WORKER_FAILURE';

export const DELETE_WORKER_REQUEST = 'DELETE_WORKER_REQUEST';
export const DELETE_WORKER_SUCCESS = 'DELETE_WORKER_SUCCESS';
export const DELETE_WORKER_FAILURE = 'DELETE_WORKER_FAILURE';
//Action yêu cầu thêm nhân viên mới
export const addWorkerRequest = (worker) => ({
    type: ADD_WORKER_REQUEST,
    payload: worker,
});
//Action yêu cầu update nhân viên
export const updateWorkerRequest = (worker) => ({
    type: UPDATE_WORKER_REQUEST,
    payload: worker,
});
//Action yêu cầu xóa nhân viên
export const deleteWorkerRequest = (workerid) => ({
    type: DELETE_WORKER_REQUEST,
    payload: workerid,
});