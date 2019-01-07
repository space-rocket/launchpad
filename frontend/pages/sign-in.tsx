import Layout from '../components/Layout'
import SignInForm from '../components/forms/SignInForm';

export default () =>
  <Layout title='Sign In'>
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
      <h2>Login into account</h2>
      <SignInForm />
      <p>Forgot password? <a href="/forgot-password">Reset password</a></p>
    </div>
  </Layout>


