import { reducer as formReducer } from 'redux-form'
import ThemeOptions from './ThemeOptions';
import Layout from './Layout';
import Auth from './Auth';
import Person from './Person';
import Notification from './Notification';

export default {
  Auth,
  ThemeOptions,
  Layout,
  form: formReducer,
  Person,
  Notification
};