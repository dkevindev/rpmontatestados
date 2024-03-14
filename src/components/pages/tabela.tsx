import { TabsContent } from "@radix-ui/react-tabs"
import { Card } from "../ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';

type atestados = {
    NUM: any
    NOME: string
    GRAD: string
    DIAS: number
    INICIO: string
    FIM: string
    MAT: string
    ESQ: string
}


export const Tabelas = () => {


    const [dados, setDados] = useState<atestados[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.108:3000/api/tabela');
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

    console.log(dados)


    return (
        <div>
            <TabsContent value="tabela">
                <Card className="p-3">
                    <Table>
                        <TableCaption>Lista de Atestados RPMONT 2024</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">NUM</TableHead>
                                <TableHead className="text-center">GRAD</TableHead>
                                <TableHead className="text-center">MATRICULA</TableHead>
                                <TableHead className="text-center">NOME</TableHead>
                                <TableHead className="text-center">OPM</TableHead>
                                <TableHead className="text-center">DIAS</TableHead>
                                <TableHead className="text-center">INICIO</TableHead>
                                <TableHead className="text-center">FIM</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dados && dados.map((item, index) => {
                                if (index > 0) {
                                    const dataFormatadaInicio = format(parseISO(item.INICIO), 'dd/MM/yyyy');
                                    const dataFormatadaFim = format(parseISO(item.FIM), 'dd/MM/yyyy');
                                    return (
                                        <TableRow>
                                            <TableCell className="text-center">{typeof item?.NUM === 'string' || 'number' ? item?.NUM : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.GRAD === 'string' || 'number' ? item?.GRAD : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.MAT === 'string' || 'number' ? item?.MAT : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.NOME === 'string' || 'number' ? item?.NOME : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.ESQ === 'string' || 'number' ? item?.ESQ : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.DIAS === 'string' || 'number' ? item?.DIAS : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.INICIO === 'string' || 'number' ? dataFormatadaInicio : '-'}</TableCell>
                                            <TableCell className="text-center">{typeof item?.FIM === 'string' || 'number' ? dataFormatadaFim : '-'}</TableCell>
                                        </TableRow>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </Card>
            </TabsContent>
        </div>

    )
}