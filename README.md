# 1. React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 2. Requiring steps to build this project:
- npm create vite@latest netflix-clone
- install tailwindcss to your project
- install react-router-dom -- (npm i react-router-dom)
- add Routing to the DefinePaths file
- create Initial jsx file which will using in both Homepage and Login file.
- create HomePage, Login jsx files
- create Reasons file to add some more information about of Homepage.
- After creating Login form in Login jsx file , create ValidateEmailPassword component in utils/constants file.
- after validation has been done install the firebase.
  
# 3. Firebase Installation:
- create a project in the firebase website.
- create Firebase file in utils/ paste the given code in the browser. 
- run the command for installation of firebase --(npm install firebase)
- In the firebase website go to the project overview and enable the authentication.
- install firebase CLI using this command locally --(npm install -g firebase-tools)
  
# 4. Deployement the project with Firebase:
- firebase login 
- firebase init
- Select this option
  -    Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
- Answer this following questions.
   - What do you want to use as your public directory? build 
   - Configure as a single-page app (rewrite all urls to /index.html)? No
   - Set up automatic builds and deploys with GitHub? No
- npm run build
- firebase deploy
  

# 5. Redux Store Set-up
- npm i -D @reduxjs/toolkit
- npm i react-redux
- create appStore jsx file in /utils
- create userSlice jsx file in /utils
- add Provider to the App jsx file

Adding Sign out to Browse file
using useDispatch to send all the userInfo to the store
 - Changing onAuthStateChange function from the DefinePath file to Initial jsx file

# 6. Building the Browse Page
- get the tmdb api
- paste the api in .env.local file
- paste the api options from the tmdb>now playing documentation website and add it to the .utils/constants 
- you'll get the array printing two time in console this is due to the app file is wrapped up in StrictMode in main jsx file  
   - StrictMode does extra rendering to the components to check some any inconsistencies in our respective code
- create a new folder called hooks where you will place all you functions which will get the data from the TMDB api and add to the redux store 
- Create two folders on utils (store, slice) to put the stores and slice part in respective folders
- create useNowPlayingMovies jsx file and get the movielist from the api
- create MainContainer and SecondaryContainer jsx files in /component folder 

# 7. Building the MainContainer
- So previously we dispatch the  movieList to the addNowPlayingMovies and now the time to get the info through --(useSelector).
- Create the VideoBackground , VideoTitle jsx files.
- After creation of both files:
- Pass the requirements to both VideoBackGround and VideoTitle jsx files.
- Implement the new jsx file for the mobile Screens also --(MobileBrowsePage)
   
   # 7.1 Building the VideoBackground
   -  create a reducer name:addTrailerVideo in movieSlice
   -  Create useTrailerVideo for the fetching the video details.
   -  Add the trailer info by the details to the addTrailVideo in useTrailerVideo jsx file
   - Now in VideoBackGround jsx file fetch the details using --(useSelector)
   - After getting the information by using iframe element 
   # 7.2 Building the VideoTitle
   - just by passing the props from mainContainer try to add some styles .

# 8. Developing Movies/Series Details list
- create usePopularMovies,useTopRated, useUpcoming jsx files.
- These files call the api and fetch the info of the movies according to the name of the file.
- create usePopularSeries, useTopRatedSeries jsx files
- These files call the api and fetch the info of the series according to the name of the file.
- After all Developing the files just put it in the browse page such that it fetches when it in main page.
- make the another file MobileBrowsePage for mobile devices.
- Add VideoTitle, VideoBackGround, MobileBrowsePage to the Main Container.

# 9. Developing the Secondary Container
- Develop the MovieList jsx file.
- Add one by one categories custom hooks which was built for fetching API's .
- Create a MovieCard jsx file such that to add the movie poster to that file
- add it to the jsx file of MovieList.
  
# 10. Developing the DetailedInfo.
- So After creation of MovieList and MovieCard.
- Now I want to create the separate page such that when I click on the paritculate photo of the movie the details like poster details and cast and crew had been shown.
- when I click on the photo which was developed in  MovieCard it redirects to the (`${id}`) page nothing but DetailedInfo.
  # 10.1 Developing the useUpdateMovieDetails file.
  - After Clicking the paritcular movie/series card such that with the id of the movie/series.
  - The api must be called to get the all the info.
  - The info will be stored in the store in contentDetails, creditDetails.
  

  # 10.2 Creating the detailInfoSlice jsx file.
  - Create the file when I clicked on the movieCard it fetches the information from the store and divided it into the MovieDetails and CreditDetails file.
  
  # 10.3 Creating the MovieDetails file
  - In this File the info about the movie such that movie poser , name, overview will be shown.
  - If we Clicked on the Series , so there must be seasons in the series.
  - So create the Season file and in the Season file we need to iterate all the seasons so for that create SeasonCard jsx file.

  # 10.4 Creating the CreditDetails file 
  - Don't want to put all in one file so create two files MovieDetails and CreditDetails file.
  - put two files in DetailedInfo page.
  - So in this file info about cast and Crew will be there.
  - In the file create another two files name Cast and Crew .
  - This two files will show all the details of the Cast and Crew respectively.
  - Take the information from the redux store

# 11 Creating GptSearch file
- Now it's time to add the movie suggestion kind of bot
- So Add the input Search and button
- Integrate the Gemini AI to the website for the movie recommendations 
- Give the exact prompt such that it gives accurate information 
- after that search for a movie/series for particualr category and it gives the results
   # 11.1 Creating the gptSlice file
   - We are creating this to store all the data which come from the GeminiAi 
   - if we get movie results we will add the data to the movieCategory and the name of category will be in moviesInfo
   - If we get series results we will add the data to the serieCategory and the name of the category in the seriesInfo
   - If we get the both info's we'll be adding it to the store
 
   # 11.2 Creating the gptInfo file
   - After getting and adding it to the redux store
   - It's time to show the info in the page 
   - So Creating the gptInfo file to Show the either GptMoviesDetails or GptSeriesDetails or both
   - GptMovieDetails for the movie Details
   - GptSeriesDetails for the series Details
   - When we click on particular movie/series it will redirect to the DetailedInfo page
   
# 12 Creating the MovieSearch
- So it is not difficult and it is confined to one page only 
- When you start typing just using debouncing and delay the search for particular time and if results are coming then just push it down to the MovieCard.
  
# 13 Using the TanStack Query & Redux Persist
- So When I observed some random performance issues with fetch.
- I search and came to know that one thing is there (i.e Tanstack Query) 
- Also use the Redux Persist for this project.
- When I just want to make some data not to be gone while refreshing so that's why I use Redux Persist

<p style="text-align: center; font-size: 24px; font-weight: bold;">
    *** Finally, the Project is Completed ***
</p>