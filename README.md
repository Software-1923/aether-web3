## Running Aether on Repl.it

***
- Vite
- Vue
- Three.js
- Web 3 || Alchemy and İnfura
- React
- Next
- TypeScript
- (Node.js)
***

***
- Tailwind Css
- Post Css
***

# Aether WEB SYSTEM :

### 1) Our root project folder is the "public" folder.

### 2) server.js is the main server file, vite.js is the second main server file that compresses and optimizes the website's html, css, js and svg files and uses the vite infrastructure.

### 3) The .htaccess file deletes .html extensions, but not replit, for example, if you upload the site in netlify, it automatically deletes it in the free version, and if you put "/home" at the end of the web address, it loads that page directly without getting any error or loading screen.

### 4) In addition, if there is .html in the redirect other than the .htaccess file, you can solve it with a javascript code, but since the .htaccess file does not work in the replit, when you open a new page, the .html link will cause an error, but if you upload the same code to the platform such as netlify, it will not cause any errors, on the contrary, if the database supports the .htaccess file format on the platform you publish, it will not come to the end of the link ".html" in any way.

### 5) "4" is the javascript code I mentioned;

<script>
    var currentUrl = window.location.href;

    if (currentUrl.endsWith('.html')) {
        var newUrl = currentUrl.slice(0, -5); 
        window.history.replaceState({}, document.title, newUrl); 
    }
</script>

### 6) The Main Database "data.js" file actually loads "index.html" at the beginning, index.html redirects to the "home.html" page.

### 7) Finally, if you want to update the error page, the first step is that you cannot use an external font, you have to choose the default fonts, secondly, you have to give the design codes in the "<style></style>" codes in the html, otherwise this happens: 
"<link rel="stylesheet" type="text/css" href="styles.css" />"
the code will not work.

''''
Original Developer Link: 
https://replit.com/@BerkayCINAR1/
''''

##### Note: The "data.js" server is run automatically thanks to the package.json file. The license method is the MIT license.

##### Note 2: Finally, after putting the html and css codes in the public folder, write the following code in the shell section "npm run build" and then download the file, create a new repository on github and write the necessary codes. Then open your github account with netlify by logging in and transfer the project repository.

# Good luck 👻!!!

# Update (1.0.2);

 ## It also offers a special way to activate the Next.js app.(Explore is on you :) "hint: data.js file, good luck. ")

 # // Update (1.0.3);

## + Next.js and web 3 support.
 
## Next.js request:
  ```
  ### /activate-next-app
  ```

 ## Web 3 request:
  ```
  ### /web3
  ### /web3-info
  ```

## WEB 3 İnfura:

#### First, register by going to this address: 
" https://app.infura.io/register "

#### Then, after verifying your email, change your role from the role section to "Founder, Administrator".

#### It depends on you who will use Infura (we recommend you stick with me by default).

#### In the Select Your Application Category section, select "Infrastructure, Tooling / Data"

#### Click on the "Let's build!" button and click on My First Key and copy the first key from this section. (Your first key will be at the very beginning.)

#### Now look at this code on line 13 of server.js:
const ethereumProviderUrl = 'https://mainnet.infura.io/v3/api';

#### delete the word "api" at the end of the link and paste the api you copied.


## Web 3 Read More:
You can also get api from alchemy for free,
get it from the official site and update the necessary files,
finally update the server.env and server.js file by getting the metamask secret wallet key,
etherscan api key and mongo db link.


## Npm Library Setup:
```
npm install @bugsnag/js@7.20.2 @fastify/static@6.10.2 @netlify/blobs@^6.3.0 @netlify/build@29.26.6 @netlify/build-info@7.11.1 @netlify/config@20.10.0 @netlify/edge-bundler@10.1.2 @netlify/local-functions-proxy@1.1.1 @netlify/zip-it-and-ship-it@9.26.1 @octokit/rest@19.0.13
```
```
npm install @openzeppelin/contracts@^4.7.3 @netlify/plugin-nextjs@^4.41.1 @ponomarevlad/mongo-fetch@^1.5.0-custom.3 @vitejs/plugin-legacy@^4.1.1 atlas@^1.0.0-alpha.0 atlas-app-services-admin-api@^1.5.4 atlas-fetch-data-api@^1.0.5 axios@^0.24.0 browserify-fs@^1.0.0 chalk@^5.3.0
```
```
npm install connect-history-api-fallback@^2.0.0 crypto@^1.0.1 crypto-browserify@^3.12.0 dotenv@^16.3.1 env@^0.0.2 express@^4.18.2 express-ws@^5.0.2 gzip@^0.1.0 i@^0.3.7 moment@^2.29.4 mongo-atlas-client@^1.2.0 mongo-fetch@^1.5.0 mongodb-atlas-api-client@^3.16.0 mongodb-realm-api-client@^1.29.0
```
```
npm install mongodb-stitch-api-client@^1.47.0 mongoose@^8.0.0 next@^13.5.4 node-fetch@^3.3.2 path@^0.12.7 react@^18.2.0 react-dom@^18.2.0 rollup-plugin-copy@^3.5.0 sails-mongo-atlas@^0.12.31 three@^0.158.0 vite-plugin-compression@^0.5.1 wait-on@^7.1.0 web3@^1.3.6 web3-providers@^1.0.0-beta.55
```
```
npm install winston@^3.11.0 ws@^8.14.2 bun@^1.0.21 @nomicfoundation/hardhat-toolbox@^1.0.2 @rollup/plugin-html@^1.0.3 @alchemy/aa-accounts@^1.1.0 @alchemy/aa-alchemy@^1.1.0 @alchemy/aa-core@^1.1.0 viem@^1.19.3 @types/react@^18.0.27 @types/react-dom@^18.0.10
```
```
npm install @vitejs/plugin-react@^3.1.0 autoprefixer@^10 loader-utils@3.2.1 concurrently@^8.2.1 npm-run-all@^4.1.5 postcss@^8 rollup-plugin-html@^0.2.1 tailwindcss@^3.3.5 typescript@^4.9.5 vite@^4.5.0 vite-plugin-checker@^0.6.2 hardhat@^2.10.1
```
