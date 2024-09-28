"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import PropTypes from 'prop-types'

import axios_instance from "../../constants/axios"
import { requests } from "../../constants/requests"

export function RegistrationPage({admin=false}) {

  const navigate = useNavigate();
  const [alert, setAlert] = useState({title: '', description: '', variant: 'default'});

  const FormSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address',
    }),
    username: z.string().min(1, {
      message: 'Username is required',
    }),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?/\\-]).{8,}$/i, {
      message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
    }),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmit = async (data) => {
    const { email, username, password } = data;
    try {
      const response = await axios_instance.post(requests.register, { email, username, password, createAdmin: admin });
      if (admin) {
        setAlert({title: `Admin account created!`, description: `${response.data.username} has been registered as an admin`, variant: 'success'});
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
      else {
      setAlert({title: `${response.data.email} registered successfully!`, description: 'You will be redirected shortly', variant: 'success'});
      const login_response = await axios_instance.post(requests.login, { email, password });
        secureLocalStorage.setItem('user_role', login_response.data.isAdmin ? 'admin' : 'user');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
        if (error?.response?.status === 400) {
            setAlert({title: error.response.data.message, description: 'Please try again.', variant: 'destructive'});
      } else if (error?.response?.status === 409) {
        setAlert({title: 'User already exists', description: 'Please login or continue with a different email', variant: 'destructive'});
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
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Please enter your account information</CardDescription>
        </CardHeader>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
          <div className="space-y-2">
              <FormField
                name="email"
                control={form.control}
                placeholder="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                name="username"
                control={form.control}
                placeholder="Username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                name="password"
                control={form.control}
                placeholder="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-4">
            <Button 
            className="w-full"
            type="submit"
            >
              Sign Up
            </Button>
            {!admin && (
            <Link to="/login" className="block text-center mt-4 text-blue-500 hover:text-blue-800 w-full">
              Already have an account? Sign in here.
            </Link>)}
          </CardFooter>
        </form>
        </Form>
      </Card>
    </div>)
  );
}

RegistrationPage.propTypes = {
  admin: PropTypes.bool
}