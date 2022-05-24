import axios from "axios";
import serviceError from "./apiError";

export async function serviceGet( url, configHeaders ) {

    return await axios.get(
        url,
        { headers: configHeaders }
    ).catch( error => {
        serviceError( error );
    } );

};

export async function servicePost( url, data, configHeaders ) {

    return await axios.post(
        url,
        data,
        { headers: configHeaders }
    ).catch( error => {
        serviceError( error );
    } );

};

export async function servicePut( url, data, configHeaders ) {

    return await axios.put(
        url,
        data,
        { headers: configHeaders }
    ).catch( error => {
        serviceError( error );
    } );

};

export async function servicePatch( url, data, configHeaders ) {

    return await axios.patch(
        url,
        data,
        { headers: configHeaders }
    ).catch( error => {
        serviceError( error );
    } );

};

export async function serviceDelete( url, configHeaders ) {

    return await axios.delete(
        url,
        { headers: configHeaders }
    ).catch( error => {
        serviceError( error );
    } );

};
