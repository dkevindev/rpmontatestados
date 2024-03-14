import { Button } from "../ui/button";
import { generateMessage } from "@/lib/generateMessage";




export const StepWhatsapp = () => {

    const message = generateMessage()
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(message)}`;

    return (
       <div className="text-center flex flex-col gap-5">
        <p>Atestado cadastrado com sucesso!!</p>
        <p>Notifique o Grupo do P3!!</p>
        <Button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Whatsapp</a>
        </Button>

       </div>
    )
}