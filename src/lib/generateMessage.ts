import { useAtestadoStore } from "@/stores/atestados-store"

export const generateMessage = () => {
    const {atestado} = useAtestadoStore(state => state)

    return `** NOVO ATESTADO CADASTRADO **
Data: ${atestado.data}
Dias: ${atestado.dias}
Cid: ${atestado.cid}`
}