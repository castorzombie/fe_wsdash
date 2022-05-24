export default function serviceError( error ){
    
    if( error ){
        
        const { response } = error;
        
        const { request, ...errorObject } = response;

        let errorType;

        if ( 'msg' in errorObject.data ){

            errorType = 'msg'

        } else {

            errorType = 'errors'

        }

        const { msg, errors } = errorObject.data;
        
        switch( errorType ){

            case 'msg' :
                throw msg;

            case 'errors' :
                throw errors;

            default :
                throw errorObject.data;

        }
 
    }

};