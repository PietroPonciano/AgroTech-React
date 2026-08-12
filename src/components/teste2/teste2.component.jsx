import { ShieldCheck } from "lucide-react"
import { Link } from "react-router"

export default function TesteComp2(){
    return(
        <>
        <ShieldCheck />
        <Link to="/"><p>teste2 ok.</p></Link>
        </>
    )
}