import service from '@/api/service'

export const plateListService = () => {
    return service.get("/plate");
}

export const addPlateService = (data) => {
    return service.post("/plate",data);
}

export const updatePlateService = (data) => {
    return service.put("/plate",data,{
        headers: {'Content-Type': 'application/json'}
      });
}

export const deletePlateService = (id) => {
    return service.delete(`/plate?id=${id}`);
}