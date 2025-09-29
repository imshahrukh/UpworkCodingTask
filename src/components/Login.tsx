import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { loginOrCreateUser } from '../db/db';
import { useUserStore } from '../store/userStore';
import { userLoginSchema, UserLoginFormValues } from '../validation/schemas';

const Login: React.FC = () => {
  const { setUser, setLoading, setError, isLoading, error } = useUserStore();
  const navigate = useNavigate();

  const initialValues: UserLoginFormValues = {
    name: '',
  };

  const handleSubmit = async (values: UserLoginFormValues) => {
    try {
      setLoading(true);
      setError(null);
      
      const user = await loginOrCreateUser(values.name);
      setUser(user);
      navigate('/plan');
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Construction Tasks
          </h1>
          <p className="text-gray-600">
            Manage your construction projects with ease
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={userLoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    disabled={isLoading}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-2 text-sm text-red-600"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!isValid || !dirty || isLoading}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign In / Create Account'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              New users will be automatically registered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
