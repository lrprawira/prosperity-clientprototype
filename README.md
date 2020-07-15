# Prosperity React Client (Prototype)  

---

## About this project

This is a working proof of concept which has to be paired using [the cors proxy server](https://github.com/ccxex29/prosperity-corsproxy).
This project has no warranty whatsoever and no obligation with UPH.  
  
**Please DO NOT ask UPH University for support regarding this application or the depended proxy server**  

This project uses MVP software architecture.  
This project is currently only a prototype for the final react native project that may be released 
without any **without guarantee**.  


## How to use this application

Remember, THIS IS JUST A PROTOTYPE. Things are breaking. Implementations are not beautiful.
And UPH's semi server-sided-rendering is not the easiest to work with. 
This is why a separate cors proxy is important, not only for working around CORS errors 
but to deal with the retrieved data into a cleaner and more expected response.  

What you need to do :
  1. Clone this project and [cors proxy](https://github.com/ccxex29/prosperity-corsproxy) git
  2. Both uses yarn node pkg manager. But you can use npm as well
  3. Resolve any dependency issue on **both this and cors proxy cloned git directories**
     ```sh
     $ yarn add
     ```
  4. Run **both the cors proxy and this client** (CORS Proxy should be started before the client can sync the data)
     ```sh
     $ yarn start
     ```
  5. A new browser tab should be opened. Insert your student email and password.
  
