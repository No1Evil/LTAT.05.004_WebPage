// NO PROBLEM, TAKE THAT! :))
const MASTER_KEY = "$2a$10$JUOR5w/jlcQRAY95xO0X/OQfA/VgAARVfmgMwN/fVlQffXnPqpS5y";
/**
 * Fetch data from a given URL and return it as JSON.
 * @param {*} url - URL to fetch data from
 * @returns JSON object
 */
export async function getData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Master-Key': MASTER_KEY,
                
                'X-Bin-Meta': 'false' 
            }
        });

        const result = await response.json();
        console.log("Fetched data:", result);
        
        return result; 

    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null; 
    }
}