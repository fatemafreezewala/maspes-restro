import SimpleToast from 'react-native-simple-toast';

const toast = (msg: string = '') => {
  SimpleToast.show(msg, SimpleToast.LONG);
};

export default toast;
