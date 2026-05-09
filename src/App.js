/*
Build a user Signup form in React with the following features.

1. An email and a password input
2. Email must have an “@” and the domain side must include a “.”
3. Password must include
    1. one special character
    2. one number 
    3. be at least 8 characters
4. Submission request handling  
   1. Utilize the mock API function to handle submissions
5. Basic aesthetics with pure CSS
*/
import SignUpForm from "./components/SignUpForm";

export default function App() {
  return (
    <div className="App">
      <SignUpForm />
    </div>
  );
}
