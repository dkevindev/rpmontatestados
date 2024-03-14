import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { DialogHeader } from "../ui/dialog"
import { Progress } from "../ui/progress";
import { StepDatas } from "./step-datas";
import { StepCid } from "./step-cid";
import { StepFinish } from "./step-Finish";
import { StepWhatsapp } from "./step-whatsapp";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export type Steps = 'data' | 'cid' | 'finish' | 'whatsapp';

export const AtestadosInsert = ({ open, onOpenChange }: Props) => {

    const [step, setStep] = useState<Steps>('data')

    let progressPct = 0;
    switch (step) {
        case 'data': progressPct = 25
            break;
        case 'cid': progressPct = 50
            break;
        case 'finish': progressPct = 75
            break;
        case 'whatsapp': progressPct = 100
            break;
            
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        {step === 'data' && 'Informações de Datas/Dias'}
                        {step === 'cid' && 'Informações do Cid do Atestado'}
                        {step === 'finish' && 'Dados Médicos'}
                        {step === 'whatsapp' && 'Informe nos grupos necessários'}

                    </DialogTitle>
                </DialogHeader>
                <Progress value={progressPct} />

                <div className="flex flex-col gap-3">
                    {step === 'data' && <StepDatas setStep={setStep}/>}
                    {step === 'cid' && <StepCid setStep={setStep}/>}
                    {step === 'finish' && <StepFinish setStep={setStep}/>}
                    {step === 'whatsapp' && <StepWhatsapp/>}
                </div>
            </DialogContent>
        </Dialog>
    )
}