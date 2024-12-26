import React, { useEffect } from 'react';

const loadFacebookSDK = (appId) => {
  if (!window.FB) {
    const script = document.createElement('script');
    script.src = "https://connect.facebook.net/id_ID/sdk.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.FB.init({
        appId: appId || '', // Gunakan appId jika disediakan
        xfbml: true,
        version: 'v21.0',
      });
    };
    document.body.appendChild(script);
  } else {
    window.FB.XFBML.parse();
  }
};

const FacebookComments = ({ href, width = "100%", numPosts = 5, appId }) => {
  useEffect(() => {
    loadFacebookSDK(appId); // Panggil dengan appId
  }, [href, appId]);

  return (
    <div 
      className="fb-comments" 
      data-href={href} 
      data-width={width} 
      data-numposts={numPosts}>
    </div>
  );
};

export default FacebookComments;
