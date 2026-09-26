# JS Practice Lab

A small interactive site for teaching JavaScript basics to backend-development
students. Each exercise gives students a single function, up to five editable
variables, and a `console.log` — they edit values, click **Run code**, and see
their output immediately.

Exercises included:
1. Simple Addition
2. Wallet Balance (let vs const)
3. Pass or Fail (if / else)
4. Average Score (all 5 variables at once)
5. Function Calling a Function

Student code is saved in their own browser (`localStorage`), so refreshing the
page won't lose their work. Code runs entirely in the browser — nothing is
sent to a server, so it's safe to let students experiment freely.

## Running locally

```bash
npm install
npm start
```

Then open http://localhost:3000

## Deploying on Render

1. Push this folder to a GitHub repository.
2. On [render.com](https://render.com), click **New +** → **Web Service**.
3. Connect the repository.
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click **Create Web Service**. Render will build and give you a live URL
   (something like `https://js-practice-lab.onrender.com`) you can share with
   your students.

No environment variables or database are required.

## Adding your own exercises

Open `public/exercises.js` — each exercise is one object in the `EXERCISES`
array with a title, tagline, instructions, a hint, and starter code. Add a
new object to the array and it will automatically appear in the sidebar.
