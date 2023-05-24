---
layout: Post
title: URL Minimizer - Crafting a URL Shortener with Next.js and Vercel
description: Today, we'll be spinning up a charming URL shortener we've dubbed "URLMinimizer". We'll navigate the corridors of Next.js, using its very own API routes as a backend. And for the grand finale, we'll be deploying on Vercel.
date: '2023-05-24'
tags:
  - node-js
images:
  - src: /photos/blog-url-minimizer.png
    alt: url-minimizer
featured: true
---

# URL Minimizer: Crafting a URL Shortener with Next.js and Vercel

Welcome to the grand digital parlour! Today, we'll be spinning up a charming URL shortener we've dubbed "URLMinimizer". We'll navigate the corridors of Next.js, using its very own API routes as a backend. And for the grand finale, we'll be deploying on Vercel. So, hang on tight and enjoy the ride as we transform lengthy URLs into cute, tiny web addresses!

## Preparations: Next.js and MongoDB

### Step 1: Setting Up Our Next.js Project

Kick off by setting up a fresh Next.js application:

```bash
npx create-next-app url-minimizer
cd url-minimizer
```

### Step 2: Summoning Our Dependencies

Next, install a couple of dependencies we need: `mongoose` for dealing with MongoDB, and `nanoid` for generating unique IDs.

```bash
npm install mongoose nanoid
```

### Step 3: Sculpting the URL Model

We'll create our model in a new file `models/UrlModel.js`:

```javascript
import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Url || mongoose.model('Url', UrlSchema);
```

## Next.js API Routes as Backend

Next, let's dive into the real magic: Next.js API routes.

### Step 4: Weaving the URL Transformation Spell

Let's create a POST route at `pages/api/shorten.js` to handle the URL shortening logic:

```javascript
import mongoose from 'mongoose';
import Url from '../../models/UrlModel';
import { nanoid } from 'nanoid';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { longUrl } = req.body;

  if (!longUrl) return res.status(400).json({ error: 'URL is required' });

  let existingUrl = await Url.findOne({ longUrl });
  if (existingUrl) return res.json({ shortUrl: existingUrl.shortUrl });

  let shortUrl = nanoid(7);
  let url = new Url({ longUrl, shortUrl });
  await url.save();

  res.json({ shortUrl });
};
```

### Step 5: Conjuring the Redirection Incantation

Next, we'll create a GET route at `pages/[shortUrl].js` to handle the redirection:

```javascript
import Url from '../models/UrlModel';

export async function getServerSideProps({ params }) {
  const url = await Url.findOne({ shortUrl: params.shortUrl });

  if (!url) return { notFound: true };

  return {
    redirect: {
      destination: url.longUrl,
      permanent: false,
    },
  };
}

export default function ShortUrl() {
  return <div />;
}
```

## The Frontend Charm: React.js with Tailwind CSS

It's time to add a dash of elegance. We'll conjure a stunning UI using React.js and Tailwind CSS.

First, install Tailwind CSS:

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then, incorporate Tailwind into your styles. In `styles/globals.css`, add:

```css
@import 'tailwindcss/base';
@import 'tailwind

css/components';
@import 'tailwindcss/utilities';
```

Next, let's create our frontend magic in `pages/index.js`:

```jsx
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrls, setShortUrls] = useState(JSON.parse(localStorage.getItem('shortUrls')) || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('/api/shorten', { longUrl });
      const newShortUrl = { longUrl, shortUrl: res.data.shortUrl };
      setShortUrls([newShortUrl, ...shortUrls]);
      localStorage.setItem('shortUrls', JSON.stringify([newShortUrl, ...shortUrls]));
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Shrink Your URLs
          </h2>
        </div>
        <form className="mt-8" onSubmit={handleUrlShorten}>
          <div className="rounded-md shadow-sm">
            <div>
              <input
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                placeholder="Long URL"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">
            Your Shortened URLs
          </h2>
          {shortUrls.map((url, index) => (
            <div key={index} className="mt-3 bg-white rounded shadow p-3">
              <p className="text-gray-900 break-all">
                <b>Long URL:</b> {url.longUrl}
              </p>
              <p className="text-indigo-600 break-all">
                <b>Short URL:</b> {window.location.origin}/{url.shortUrl}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Production Deployment with Vercel

Now that we have our application, it's time to deploy. Vercel, the creators of Next.js, make it pretty straightforward.

### Step 7: Install

 Vercel CLI

```bash
npm install -g vercel
```

### Step 8: Deploy on Vercel

From your project directory, run the following command:

```bash
vercel
```

Follow the prompts, and Vercel will take care of the rest. Once the deployment is done, you will receive a URL where your application is live!

And voilà! You've now got a shiny new URL shortener built with Next.js, leveraging API routes as a backend and hosted on Vercel. Go forth and shorten those URLs!