import { useAuth } from '../auth/AuthProvider'

const Dashboard = () => {

    const auth = useAuth();
    {console.log(auth.getUser())}

    return ( 
        <h1>Dashboard de {auth.getUser().name} </h1>
        
    );
}

export default Dashboard; 