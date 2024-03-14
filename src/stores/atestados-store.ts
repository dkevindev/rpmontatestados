import { create } from "zustand";

type States = {
    policial: {
        num: string
        nome: string
        matricula: string
        grad: string
        opm: string
    }
    atestado: {
        dias: string
        cid?: string
        tipo?: string
        medico: string
        crm: string
        hospital: string
        data: string
    }
   
}

type Actions = {
    setPolicial: (policial: States["policial"]) => void 
    setAtestado: (atestado: States["atestado"]) => void 
};

const initialState: States = {
    policial: {
        num: '',
        nome: '',
        matricula: '',
        grad: '',
        opm: ''
    },
    atestado: {
        dias: '',
        cid: '',
        tipo: '',
        medico: '',
        crm: '',
        hospital: '',
        data: '',
    }
}

export const useAtestadoStore = create<States & Actions>()(set => ({
    ...initialState,
    setPolicial: (policial) => set(state => ({...state, policial})),
    setAtestado: (atestado) => set(state => ({...state, atestado}))
}));