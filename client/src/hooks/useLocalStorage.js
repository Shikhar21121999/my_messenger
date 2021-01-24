import { useState, useEffect } from 'react';

const PREFIX="my_messenger"

// eslint-disable-next-line no-lone-blocks
/*
This is a hook which is used 
to set and update value linked to key
in local storage
parameter : 'key' key of item in local storage
'value' initial value to be put in local storage linked to key
*/

function get_savedvalue(key,initialValue){
    /*
    This is a lazy function for the useState
    key refers to localstorage key 
    and initial value can be a function
    which is used to refer to a function passed
    */
    
    const save_data=localStorage.getItem(key);

    if (save_data != null ) return JSON.parse(save_data);
    if (typeof initialValue === 'function') {
        return initialValue();
    }
    else{
        return initialValue;
    }

}

export default function useLocalStorage(key,initialValue) {
/*
    We make it simmilar to useState hook
    which takes value as the state
    and returns a function to update the value
    linked to a key
    We internally use useEffect to reflect update 
    local storage according to state change in value
*/
    const prefixed_key=PREFIX+key;

    const [value,setValue] = useState(()=> {
        return get_savedvalue(prefixed_key,initialValue);
    });

/*
    Create an effect to update data in local storage
    when state 'value' is changed
*/
    useEffect(()=>{
        localStorage.setItem(prefixed_key, JSON.stringify(value));
    }, [prefixed_key,value]);
    
    return [value,setValue];
}