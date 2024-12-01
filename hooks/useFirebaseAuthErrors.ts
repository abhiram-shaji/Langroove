const useFirebaseAuthErrors = () => {
    const getErrorMessage = (errorCode: string): string => {
      switch (errorCode) {
        case 'auth/claims-too-large':
              return 'Something went wrong with your request. Please try again later.';
          case 'auth/email-already-exists':
              return 'This email is already registered. Try signing in instead.';
          case 'auth/id-token-expired':
              return 'Your session has expired. Please log in again.';
          case 'auth/id-token-revoked':
              return 'Your account has been signed out. Please log in again.';
          case 'auth/insufficient-permission':
              return 'You do not have permission to perform this action.';
          case 'auth/internal-error':
              return 'Oops! Something went wrong. Please try again later.';
          case 'auth/invalid-argument':
              return 'There was an error in your request. Please check and try again.';
          case 'auth/invalid-claims':
              return 'There is an issue with your account. Please contact support.';
          case 'auth/invalid-continue-uri':
              return 'The provided link is invalid. Please check and try again.';
          case 'auth/invalid-creation-time':
              return 'There seems to be a problem. Please try again later.';
          case 'auth/invalid-credential':
              return 'The credentials you entered are incorrect. Please try again.';
          case 'auth/invalid-disabled-field':
              return 'There seems to be an issue with your account. Please contact support.';
          case 'auth/invalid-display-name':
              return 'The display name you entered is invalid. Please try again.';
          case 'auth/invalid-dynamic-link-domain':
              return 'There is an issue with the link you used. Please try again.';
          case 'auth/invalid-email':
              return 'The email address you entered is not valid. Please check and try again.';
          case 'auth/invalid-email-verified':
              return 'There is an issue with your email verification. Please try again.';
          case 'auth/invalid-id-token':
              return 'Your session has expired. Please log in again.';
          case 'auth/invalid-last-sign-in-time':
              return 'There seems to be an issue. Please try again later.';
          case 'auth/invalid-password':
              return 'Your password must be at least six characters long.';
          case 'auth/invalid-phone-number':
              return 'The phone number you entered is not valid. Please check and try again.';
          case 'auth/invalid-provider-data':
              return 'There seems to be an issue. Please try again.';
          case 'auth/invalid-provider-id':
              return 'There is an issue with your account. Please contact support.';
          case 'auth/operation-not-allowed':
              return 'This sign-in method is currently disabled. Please contact support.';
          case 'auth/phone-number-already-exists':
              return 'This phone number is already associated with another account.';
          case 'auth/project-not-found':
              return 'There seems to be an issue with the service. Please try again later.';
          case 'auth/too-many-requests':
              return 'Too many attempts. Please wait and try again later.';
          case 'auth/unauthorized-continue-uri':
              return 'The provided link is not authorized. Please check and try again.';
          case 'auth/user-not-found':
              return 'No account found with this email. Please check and try again.';
          case 'auth/wrong-password':
              return 'The password you entered is incorrect. Please try again.';
          case 'auth/uid-already-exists':
              return 'There seems to be an issue with your account. Please contact support.';
          default:
              return 'Something went wrong. Please try again later.';
      }
    };
  
    return { getErrorMessage };
  };
  
  export default useFirebaseAuthErrors;
  