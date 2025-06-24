Recipe Finder

Recipe Finder is a simple React app built with Next.js for searching recipes with filters by name, cuisine, and preparation time. The project uses Tailwind CSS for styling, Axios for API requests, and react-hot-toast for notifications.

🔑 Environment Variables
Before running the app, create a .env.local file in the root of your project with the following:

```env
SPOONACULAR_API_KEY=your_api_key_here
You can get your free API key from Spoonacular API.
```

📦 Installation & Running

1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-finder.git
cd recipe-finder
```

2. Install dependencies
```bash
npm install
# or
yarn install
````

3. Run in development mode

```bash
npm run dev
# or
yarn dev
````

Open http://localhost:3000 in your browser.

4. Build and run in production

```bash
npm run build
npm start
# or
yarn build
yarn start
````

🚀 Features

1. Search recipes by keyword.

2. Filter by cuisine type (Italian, Japanese, American, etc.).

3. Filter by maximum preparation time.

4. Display recipe list with images and titles.

5. View detailed recipe info (summary, ingredients, etc.).

6. Input validation with error notifications.

7. Responsive design using Tailwind CSS.
   

🏗️ Architecture & Technologies

- Next.js (App Router, client components): routing and server-side rendering.

- React hooks (useState, useEffect): state management and side effects.

- Axios: API data fetching.

- React-hot-toast: user notifications.

- Tailwind CSS: utility-first styling and responsive layouts.

- API routes: custom backend endpoints for fetching recipe data.


⚙️ Possible Improvements

- Add more filter options.

- Implement pagination for recipe lists.

- Enhance UI/UX with animations.

