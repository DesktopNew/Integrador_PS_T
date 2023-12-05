import styles from "@/styles/movie.module.css";
import { useRouter } from "next/router";
import { useEffect , useState } from "react";
import imageMovie from "@/public/imageMovie/error.404.avif";

export default function page({ movieName }:any) {

    const [ movie, setMovie ]:any = useState();
    const router = useRouter();

    async function fetchData(){
        try{
            const response = await fetch(`/api/action/movie/find?name=`+movieName , {
                method: 'GET'
            });

                const responseJson = await response.json();

                setMovie(responseJson);

        }
        catch (err:any) {
            alert(err.message);
        }
    }

    useEffect(() =>  {
        fetchData();
    } , [])

    
    return (
        <main>
            <div className={styles.container}>
                
            {movie != undefined ? 
            
            <div>
                <img src="{imageMovie.src}" className="{styles.movieImage}"/>

                <p>Filme Encontrado.</p>
                <p>O Nome do Filme é {movie.name}</p>
                <p>A Data de Lançamento é: {movie.releaseDatagh}</p>

            </div>

            :

            <div>
                <p>Filme Não Encontrado</p>
            </div>
        }   
        </main>
    );
}

export function getServerSideProps( context:any ) {
    const { movieName } = context.query;

    return {
        props: {
            movieName
        }
    }
}