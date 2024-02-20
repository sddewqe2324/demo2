import Head from 'next/head';
import { useEffect, useState } from 'react';

const Layout = ({ children, data }) => {
    const [facebookPixelScript, setFacebookPixelScript] = useState('');
    const [facebookPixelNoscript, setFacebookPixelNoscript] = useState('');
    const [facebookPixelID, setFacebookPixelID] = useState('');

    useEffect(() => {
        if (data?.FacebookPixel) {
            // Extract the content within <script> tags
            const match = data.FacebookPixel.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
            const scriptContent = match ? match.join('') : '';

            // Remove <script> tags from the scriptContent
            const cleanedScript = scriptContent.replace(/<script>|<\/script>/gi, '');

            setFacebookPixelScript(cleanedScript);

            // Extract the content within <noscript> tags
            const noscriptMatch = data.FacebookPixel.match(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi);
            const noscriptContent = noscriptMatch ? noscriptMatch.join('') : '';

            setFacebookPixelNoscript(noscriptContent);

            // Extract FacebookPixelID from noscriptContent
            const idMatch = noscriptContent.match(/tr\?id=([0-9]+)/);
            const extractedID = idMatch ? idMatch[1] : '';

            setFacebookPixelID(extractedID);
        }
    }, [data?.FacebookPixel]);


    return (
        <>
            <Head>
                    <script dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '923229855821294');
fbq('track', 'PageView');
` }} />ˇ <script dangerouslySetInnerHTML={{ __html: `<!-- Google tag (gtag.js) -->
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EZD8VK19R7')` }} />        

<script async src="https://www.googletagmanager.com/gtag/js?id=G-EZD8VK19R7"/>    </Head>
            {facebookPixelScript && (
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: `
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${facebookPixelID}&ev=PageView&noscript=1"
        />
      `,
                    }}
                />
            )}
            {children}
        </>
    );
};

export default Layout;
