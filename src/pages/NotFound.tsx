import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function NotFound() {
 
   let navigate = useNavigate()

   function goBackHome() {
     navigate('/')
   }
 
    return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={goBackHome}>
        Go Back Home
      </Button>
    </div>
  );
  
}