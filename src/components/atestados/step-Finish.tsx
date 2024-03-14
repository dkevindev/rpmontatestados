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
    medico: z.string().min(1, 'Preencha o nome do médico'),
    crm: z.string().min(1, 'Preencha o CRM do médico'),
    hospital: z.string().min(2, 'Preencha o nome do hospital de atendimento')
})

export const StepFinish = ({ setStep }: Props) => {
    const { atestado, setAtestado } = useAtestadoStore(state => state)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            medico: '',
            crm: '',
            hospital: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAtestado({ ...atestado, medico: values.medico, crm: values.crm, hospital: values.hospital })
        setStep('whatsapp')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="medico"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Médico que atendeu</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Digite o nome do médico que atendeu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="crm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CRM do médico</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Digite o CRM do médico que atendeu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hospital"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hospital de atendimento</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Digite o nome do hospital de atendimento" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Finalizar</Button>
            </form>
        </Form>
    )
}