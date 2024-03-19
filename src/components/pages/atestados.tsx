import { TabsContent } from "@radix-ui/react-tabs"
import { Card } from "../ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { AtestadosInsert } from "../atestados/dialog"

export type policial = {
  NUM: string
  NOME: string
  MAT: string
  GRAD: string
  OPM: string
  QRA: string
}


export const NovoAtestado = () => {
  const [insertOpen, setInsertOpen] = useState(false)
  const [dados, setDados] = useState<policial[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState<policial[]>([]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://25.4.107.112:3000/api/dados');
        if (!response.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const dadosJson = await response.json();
        setDados(dadosJson);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  useEffect(() => {
    const buscarPoliciais = () => {
      const termo = termoBusca.toLowerCase();
      const resultados = dados.filter(dados =>
        (dados.QRA && String(dados.QRA).toLowerCase().includes(termo)) ||
        (dados.NUM && String(dados.NUM).includes(termo)) ||
        (dados.MAT && String(dados.MAT).toLowerCase().includes(termo))
      );
      setResultados(resultados);
    };

    buscarPoliciais();
  }, [termoBusca]);


  console.log(resultados)


  return (
    <div>
      <TabsContent value="atestados">
        <Card className="p-3">
          <div className="flex gap-2 items-center">
            <h1 className="flex-1">Localizar Policial</h1>
            <Input value={termoBusca} onChange={e => setTermoBusca(e.target.value)} placeholder="Digite o numeral ou matrícula do policial" className="w-2/3" />
          </div>
        </Card>
        {resultados.length > 0 && (
          <Card className="mt-3 p-3 text-center">
          <p>Nome: <span className="text-muted-foreground">{typeof resultados[0]?.NOME === 'string' ? resultados[0].NOME : ''}</span></p>
          <p>Num: <span className="text-muted-foreground">{typeof resultados[0]?.NUM === 'string' || 'number' ? resultados[0].NUM : ''}</span> Matrícula: <span className="text-muted-foreground">{typeof resultados[0]?.MAT === 'string' ? resultados[0].MAT : ''}</span></p>
          <p>Posto/Grad: <span className="text-muted-foreground">{typeof resultados[0]?.GRAD === 'string' ? resultados[0].GRAD : ''}</span> OPM: <span className="text-muted-foreground">{typeof resultados[0]?.OPM === 'string' ? resultados[0].OPM : ''}</span></p>
        </Card>
        )}
        <Button onClick={() => setInsertOpen(true)} className="mt-3 w-full">Inserir</Button>
      </TabsContent>
      <AtestadosInsert
        open={insertOpen}
        onOpenChange={setInsertOpen}
      />
    </div>

  )
}