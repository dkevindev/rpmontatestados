import { ModeToggle } from "./mode-toggle";
import Logo from '@/assets/logo.png';

export const Header = () => {
    return (
        <div>
            <div className="flex items-center justify-center flex-col">
                <img src={Logo} alt="RPMONT" />
                <h1 className="text-xl">Regimento de Policia Montada Coronel Moura Brasil</h1>
                <h1 className="text-xl">Sistemas RPMONT</h1>
            </div>
            <div className="fixed right-3 top-3">
                <ModeToggle />
            </div>
        </div>
    )
}