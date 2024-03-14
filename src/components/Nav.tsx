import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NovoAtestado } from "./pages/atestados"
import { Tabelas } from "./pages/tabela"

export const NavBar = () => {
    return (
        <div className="mx-3">
            <Tabs defaultValue="atestados">
                <TabsList className="flex mt-3 mb-2">
                    <TabsTrigger className="flex-1" value="atestados">Adicionar Atestados</TabsTrigger>
                    <TabsTrigger className="flex-1" value="tabela">Atestados</TabsTrigger>
                </TabsList>
                <NovoAtestado/>
                <Tabelas/>
            </Tabs>
        </div>
    )
}