🎯 Project Title: "GitHub User Explorer"
🔍 Problem Statement

Build a GitHub User Explorer web app that allows users to search for GitHub profiles, view details, and explore their repositories — all while demonstrating strong React fundamentals and performance optimization.

🧠 Core Requirements
1️⃣ Search with Debounce

Input box to search for a GitHub username (e.g., kashishagrahari).

Implement debouncing so API calls happen only after the user stops typing for 500ms.

Use useEffect, useState, and setTimeout for this.

API → https://api.github.com/search/users?q={query}

2️⃣ Display User Cards

Show results (user cards) for each matching username.

Each card should show:

Profile image

Username

Profile URL

“View Repos” button

3️⃣ Pagination

GitHub API supports pagination via ?page=1&per_page=10.

Add Next / Previous buttons to load more results.

Show current page number.

4️⃣ User Details Page

When user clicks “View Repos”, navigate to a Detail Page.

On this page, fetch and show the user’s repositories.

API → https://api.github.com/users/{username}/repos

Each repo should show:

Repo name

Stars ⭐ count

Description

5️⃣ Infinite Scrolling (Bonus for list of repos)

Instead of Next/Previous buttons on repo list, implement infinite scroll.

As you scroll down, fetch next page of repos.

Use IntersectionObserver or scroll event listener + throttle.

6️⃣ LocalStorage

Store recent search queries in localStorage.

Show “Recent Searches” below the search box.

When clicked, fill the input and trigger the search again.

7️⃣ Error + Loading Handling

Show loading spinner while fetching.

Show error message if user not found or API fails.

Use conditional rendering.

8️⃣ Throttling (Bonus Feature)

Add a “Live Search Suggestions” box.

When typing, throttle API calls (limit to one every 1s).

Compare with debouncing behavior.

9️⃣ Reusable Components

Make at least these reusable:

SearchBar (handles debounce logic)

UserCard

RepoCard

Pagination or InfiniteScrollList

🔟 Hooks to Use

✅ useState
✅ useEffect
✅ useRef
✅ useCallback (for memoized debounce functions)
✅ useMemo (to optimize filtered or computed data)

⚙️ Extra Add-ons (optional but recommended)

If you want to push yourself a bit more later:

Add dark mode toggle using useContext.

Add favourite users feature stored in localStorage.

Add a custom hook for API fetching (useFetch).

Add a skeleton loader while loading.