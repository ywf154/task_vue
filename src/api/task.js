import service from '@/api/service'

export const tasks0ListService = () => {
    return service.get("/task");
}

export const addTaskService = (data) => {
    return service.post(`/task`,data);
}

export const updateTaskService = (data) => {
    return service.put(`/task`,data);
}

export const deleteTaskService = (id) => {
    return service.delete(`/task?id=${id}`);
}

export const tasksListService = () => {
    return service.get(`/task/all`);
}

export const finishTaskService = (id) => {
    return service.get(`/task/f?id=${id}`);
}

export const notfinishTaskService = (id) => {
    return service.get(`/task/nf?id=${id}`);
}

export const getATaskByIdService = (id) => {
    return service.get(`/task/t?id=${id}`);
}

export const noticeService = (data) => {
    return service.post(`/task/notice`,data);
}