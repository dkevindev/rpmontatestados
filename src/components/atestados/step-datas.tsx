import { Dispatch, SetStateAction } from "react"
import { Steps } from "./dialog"
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtestadoStore } from "@/stores/atestados-store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
    setStep: Dispatch<SetStateAction<Steps>>
}

const formSchema = z.object({
    dias: z.string().min(1, 'Preencha a quantidade de dias'),
    data: z.string().min(2, 'Preencha a data do atestado')
})

export const StepDatas = ({ setStep }: Props) => {
    const { atestado, setAtestado } = useAtestadoStore(state => state)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dias: '',
            data: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAtestado({ ...atestado, dias: values.dias, data: values.data })
        setStep('cid')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="dias"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dias de afastamento</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Digite a quantidade de dias" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data do afastamento</FormLabel>
                            <FormControl>
                                <Input type="date" placeholder="Digite a data do afastamento" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Próximo</Button>
            </form>
        </Form>
    )
}