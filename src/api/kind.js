import service from '@/api/service'

export const kindListService = () => {
    return service.get("/kind");
}

export const addKindService = (data) => {
    return service.post("/kind",data);
}

export const updateKindService = (data) => {
    return service.put("/kind",data);
}

export const deleteKindService = (id) => {
    return service.delete(`/kind?id=${id}`);
}