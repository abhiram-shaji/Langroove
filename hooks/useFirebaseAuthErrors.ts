const useFirebaseAuthErrors = () => {
    const getErrorMessage = (errorCode: string): string => {
      switch (errorCode) {
        case 'auth/claims-too-large':
          return 'The claims payload exceeds the maximum allowed size.';
        case 'auth/email-already-exists':
          return 'The email is already in use.';
        case 'auth/id-token-expired':
          return 'Your session has expired. Please sign in again.';
        case 'auth/id-token-revoked':
          return 'Your session has been revoked. Please sign in again.';
        case 'auth/insufficient-permission':
          return 'You don’t have permission to access this resource.';
        case 'auth/internal-error':
          return 'An internal error occurred. Please try again later.';
        case 'auth/invalid-argument':
          return 'An invalid argument was provided.';
        case 'auth/invalid-claims':
          return 'The provided custom claims are invalid.';
        case 'auth/invalid-continue-uri':
          return 'The continue URL must be a valid URL.';
        case 'auth/invalid-creation-time':
          return 'The creation time must be a valid UTC date string.';
        case 'auth/invalid-credential':
          return 'Invalid credentials. Please try again.';
        case 'auth/invalid-disabled-field':
          return 'Invalid value for the disabled user property.';
        case 'auth/invalid-display-name':
          return 'The display name must be a non-empty string.';
        case 'auth/invalid-dynamic-link-domain':
          return 'The dynamic link domain is not authorized for this project.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/invalid-email-verified':
          return 'Invalid email verification state.';
        case 'auth/invalid-id-token':
          return 'The ID token is not valid.';
        case 'auth/invalid-last-sign-in-time':
          return 'Invalid last sign-in time.';
        case 'auth/invalid-password':
          return 'Password must be at least six characters.';
        case 'auth/invalid-phone-number':
          return 'The phone number is not valid.';
        case 'auth/invalid-provider-data':
          return 'Invalid provider data.';
        case 'auth/invalid-provider-id':
          return 'Invalid provider identifier.';
        case 'auth/operation-not-allowed':
          return 'Sign-in provider is disabled for this Firebase project.';
        case 'auth/phone-number-already-exists':
          return 'The phone number is already in use.';
        case 'auth/project-not-found':
          return 'No Firebase project was found.';
        case 'auth/too-many-requests':
          return 'Too many login attempts. Please try again later.';
        case 'auth/unauthorized-continue-uri':
          return 'Unauthorized continue URL domain.';
        case 'auth/user-not-found':
          return 'No user found with this email.';
        case 'auth/wrong-password':
          return 'Incorrect password.';
        case 'auth/email-already-exists':
          return 'This email is already in use by another account.';
        case 'auth/uid-already-exists':
          return 'This UID is already in use.';
        default:
          return 'An unknown error occurred.';
      }
    };
  
    return { getErrorMessage };
  };
  
  export default useFirebaseAuthErrors;
  