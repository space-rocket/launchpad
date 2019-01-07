import LayoutNot from '../components/Layout';
import ForgotForm from '../components/forms/ForgotForm';

export default () =>
  <LayoutNot title='Forgot Password'>
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
      <h2>Forgot password</h2>
      <ForgotForm />
      <p><a href="/sign-in">Back to login</a></p>
    </div>
  </LayoutNot>