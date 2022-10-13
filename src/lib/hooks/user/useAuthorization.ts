
import { api } from "../../api"
import { useQuery } from '@tanstack/react-query'
import { ILogin } from "../../../types"

export const loginUser = async (data: ILogin) => {
    const resp = await api.post('/authorize', data)
    return resp.data
}

 