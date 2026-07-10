# Julia's Secret World

A small, responsive personal essay website designed for GitHub Pages.

## What is included

- Home page with category rooms and recent posts
- Archive page with category filters and search
- About page
- Three editable sample essays
- Random article button
- Mobile-friendly layout
- No framework, build step, or paid hosting required

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `julias-secret-world`.
2. Upload every file and folder from this package to the repository.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/root` folder, then click **Save**.
6. GitHub will provide a public website address after deployment.

## Add a new essay

1. Copy one of the files inside the `posts` folder.
2. Rename it with a short URL-friendly name, such as `my-new-essay.html`.
3. Edit the title, metadata, and article text.
4. Open `assets/posts.js` and add a matching entry to the `POSTS` list.
5. Commit and push the changes.

Example entry:

```js
{
  title: "My New Essay",
  excerpt: "A one-sentence description.",
  date: "2026-07-09",
  displayDate: "July 9, 2026",
  category: "Little Thoughts",
  place: "Los Angeles",
  mood: "curious",
  readingTime: "5 min read",
  url: "posts/my-new-essay.html"
}
```

## Replace the About photo

1. Put your image in the `assets` folder, for example `julia.jpg`.
2. In `about.html`, replace the `portrait-placeholder` block with:

```html
<img class="about-photo" src="assets/julia.jpg" alt="Julia" />
```

3. Add this to `assets/style.css`:

```css
.about-photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 22px;
}
```

## Privacy note

GitHub Pages websites are public. Do not upload private writing, personal addresses, passwords, or anything you would not want indexed online.
