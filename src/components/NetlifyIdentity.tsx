
import { useEffect } from 'react';

const NetlifyIdentity = () => {
  useEffect(() => {
    // Check if the Netlify Identity widget is loaded
    if (window.netlifyIdentity) {
      // Initialize widget
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          // If no user, add login handler
          window.netlifyIdentity.on("login", () => {
            // Redirect to admin after login
            document.location.href = "/admin/";
          });
        }
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default NetlifyIdentity;
