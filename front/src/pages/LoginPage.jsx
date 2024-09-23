
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"


import axios_instance from "../../constants/axios"
import { requests } from "../../constants/requests"

export function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({title: '', description: '', variant: 'default'});

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios_instance.post(requests.login, { email, password }, { withCredentials: true });
      secureLocalStorage.setItem('user_role', response.data.isAdmin ? 'admin' : 'user');
      navigate('/home');
    } catch (error) {
      if (error?.response?.status === 400) {
        setAlert({title: 'Invalid email or password', description: 'Please try again.', variant: 'destructive'});
      } else {
        setAlert({title: 'An error occurred', description: 'Please try again later.', variant: 'destructive'});
      }
    }
  }

  const handleAlertClose = () => {
    setAlert({title: '', description: '', variant: 'default'});
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-4">
      <div className="fixed top-0 left-0 right-0 z-50 mx-auto w-72 mt-4 shadow-md bg-slate-100 rounded-lg">
        {alert.title && (
          <Alert variant={alert.variant} className="border-2 relative">
            <button 
              onClick={() => {handleAlertClose()}} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close alert"
            >
              <img src='/close.svg' alt="Close alert" width='20px' height='20px'/>
            </button>
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        )}
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-4">
            <Button 
            className="w-full"
            type="submit"
            >
              Sign In
            </Button>
            <Link to="/register" className="block text-center mt-4 text-blue-600 hover:text-blue-800 w-full">
              Don&apos;t have an account? Sign up here.
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>)
  );
}