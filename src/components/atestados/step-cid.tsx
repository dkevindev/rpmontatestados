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


export const StepCid = ({ setStep }: Props) => {

    const formSchema = z.object({
        cid: z.string().min(1, 'Preencha o CID do atestado'),
    })

    const { atestado, setAtestado } = useAtestadoStore(state => state)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cid: '',
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAtestado({ ...atestado, cid: values.cid })
        setStep('finish')
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <div className="flex gap-2 items-center">
                        <h1>Digite o CID sem pontos</h1>
                        <FormField
                            control={form.control}
                            name="cid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder="Exemplo a09" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <p className="my-3 border-2 p-2 rounded-md">Lombalgia</p>
                    <Button className="w-full">Próximo</Button>
                </div>
            </form>
        </Form>
    )
}