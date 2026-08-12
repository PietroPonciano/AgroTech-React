import { Link } from "react-router"

export default function Navbar(){
    return(
        <>
        <h1>Navbar</h1>
        <Link to="/">Home</Link>
        <Link to="/solucoes">Soluções</Link>
        <Link to="/quem-somos">Quem Somos</Link>
        <Link to="/fale-conosco">Fale Conosco</Link>
        </>
    )
}