import PoshmarkSearchForm from '../components/PoshmarkSearchForm ';
import {fetchPoshmarkQuery} from "@/services/poshmark";


export default function IndexPage() {
    function handlePoshmarkQuery(url) {
        console.log(url)
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the response object to the console
                // Handle the response data here
            })
            .catch(error => {
                console.error('There was a problem with the API call:', error);
            });
    }



    return (
        <div>
            <h1>Poshmark Search</h1>
            <PoshmarkSearchForm onSubmit={handlePoshmarkQuery} />
        </div>
    );
}
