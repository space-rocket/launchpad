import Layout from '../components/Layout';
import SignUpForm from '../components/forms/SignUpForm';

export default () =>
  <Layout title='Sign Up'>
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
      <h2>Create an account</h2>
      <SignUpForm />
    </div>
  </Layout>


