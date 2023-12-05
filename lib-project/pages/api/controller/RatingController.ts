import { findMovieByNameModel } from "../model/movie";
import { createRatingModel } from "../model/rating";
import { findUserByEmail } from "../model/user";
import { findMovieByName } from "./MovieController";


export async function createRating(value:number , comment:string , email:string, movieName:string) {
    try{

        if ( value < 0 || value > 5 ) {
            return {message : "Invalid Rating"};
        }

        const userByEmail = await findUserByEmail(email);

        if ( userByEmail != undefined ) {
            return { message: "User Not Found" };
        }

        const movieByName = findMovieByNameModel(movieName);

        if ( movieByName == undefined ) {
            return { message: "Movie Not Found" };
        }

        const response = await createRatingModel( value , comment , userByEmail.id , movieByName.id );

        return response;
    
    }

    catch (err) {
        return {message: "Something went wrong"};
    }
}