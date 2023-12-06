import styles from "@/styles/movie.module.css";
import { useRouter } from "next/router";
import { useEffect , useState } from "react";

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

                <p className={styles.field}>Filme Encontrado.</p>
                <p className={styles.field}>O Nome do Filme é {movie.name}</p>
                <p className={styles.field}>A Data de Lançamento é: {movie.releaseDatagh}</p>


            <div className={styles.ratingBox}>
                <textarea className={styles.ratingComment} placeholder="Digite o seu Comentário aqui"></textarea>


                <select className={styles.ratingValue}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button className={styles.ratingButton}>Enviar</button>

            </div>





            </div>

                :

            <div>
                <p>Filme Não Encontrado</p>
            </div>

        }   
        </div>
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